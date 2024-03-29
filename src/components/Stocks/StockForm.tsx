import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategoryTree, ICategoryTreeNode } from '../../common/dto/CategoryDTOs';
import { IStockInputDTO } from '../../common/dto/StockDTOs';
import { extractMessageFromError } from '../../common/Utils';
import NotEmpty from '../../common/validation/NotEmpty';
import ValidCategory from '../../common/validation/ValidCategory';
import ValidUnit from '../../common/validation/ValidUnit';
import ValueBetween from '../../common/validation/ValueBetween';
import useInput from '../../hooks/use-input';
import ButtonCard from '../UI/Card/ButtonCard';
import ContentCard from '../UI/Card/ContentCard';
import FlexContainer from '../UI/Container/FlexContainer';
import Button, { ButtonType } from '../UI/Control/Button';
import Input from '../UI/Control/Input';
import Select from '../UI/Control/Select';
import classes from './StockForm.module.css';

interface StockFormProps {
    onSubmitHandler: (stock: IStockInputDTO) => void;
    create?: boolean;
    initialValue: IStockInputDTO;
    categoryTree: ICategoryTree[];
}

const StockForm = (props: StockFormProps) => {
    const categoryRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    const [isSubmitError, setIsSubmitError] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Prevent stucking on scroll position on mobile devices after the software keyboard opens.
    // In that case scrolling would only be possible when the keyboard remains open.
    // Scroll happens automatically when the user focused the input and the keyboard opens.
    useEffect(() => {
        document.body.style.overflowY = 'auto';

        return () => {
            document.body.style.overflowY = 'hidden';
        };
    }, []);

    const {
        value: nameValue,
        hasError: nameHasError,
        isValid: nameIsValid,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
    } = useInput(NotEmpty, props.initialValue.name);

    const {
        value: unitValue,
        hasError: unitHasError,
        isValid: unitIsValid,
        inputBlurHandler: unitBlurHandler,
        valueChangeHandler: unitChangeHandler,
    } = useInput(ValidUnit, props.initialValue.unit);

    const {
        value: stockValue,
        hasError: stockHasError,
        isValid: stockIsValid,
        inputBlurHandler: stockBlurHandler,
        valueChangeHandler: stockChangeHandler,
    } = useInput((value: number) => ValueBetween(value, 1, 10000), props.initialValue.stock);

    const {
        value: capacityValue,
        hasError: capacityHasError,
        isValid: capacityIsValid,
        inputBlurHandler: capacityBlurHandler,
        valueChangeHandler: capacityChangeHandler,
    } = useInput((value: number) => ValueBetween(value, 0.01, 10000), props.initialValue.capacity);

    const {
        value: expiryValue,
        hasError: expiryHasError,
        isValid: expiryIsValid,
        inputBlurHandler: expiryBlurHandler,
        valueChangeHandler: expiryChangeHandler,
    } = useInput((dateString: string) => {
        return !!(!isNaN(Date.parse(dateString)) || dateString === '' || !dateString);
    }, props.initialValue.durable);

    let formIsValid =
        nameIsValid &&
        unitIsValid &&
        stockIsValid &&
        capacityIsValid &&
        expiryIsValid &&
        categoryRef.current &&
        ValidCategory(categoryRef.current.value);

    const buildNestedCategorySelect = () => {
        const selectOptGroups = props.categoryTree.map((tree: ICategoryTree) => {
            return {
                value: tree.id.toString(),
                label: tree.name,
                options: tree.subCategories.map((subTree: ICategoryTreeNode) => {
                    return {
                        label: subTree.name,
                        value: subTree.id.toString(),
                    };
                }),
            };
        });

        selectOptGroups.unshift({
            value: '0',
            label: 'default',
            options: [
                {
                    value: '0',
                    label: '--- Kategorie auswählen ---',
                },
            ],
        });

        return selectOptGroups;
    };

    const onSubmitHandler = async (event: BaseSyntheticEvent) => {
        event.preventDefault();

        if (formIsValid && categoryRef.current !== null) {
            const [parentCategoryId, subCategoryId] = categoryRef.current.value.split('__');

            const stock = parseInt(stockValue);
            const capacity = parseFloat(`${capacityValue}`.replace(',', '.'));

            try {
                await props.onSubmitHandler({
                    name: nameValue,
                    stock: stock,
                    capacity: capacity,
                    abs: stock * capacity,
                    parentCategoryId: parseInt(parentCategoryId),
                    categoryName: categoryRef.current.options[categoryRef.current.selectedIndex].text,
                    categoryId: subCategoryId,
                    unit: unitValue,
                    dateModified: new Date().toISOString(),
                    durable: expiryValue ? expiryValue.toString() : null,
                });
            } catch (e) {
                setIsSubmitError(true);
                setSubmitError(extractMessageFromError(e));
            }
        }
    };

    const onCategoryChangeHandler = (event: BaseSyntheticEvent) => {
        const [mainCategoryId] = event.target.value.split('__');

        if (mainCategoryId === '' || mainCategoryId === '0') {
            unitChangeHandler(undefined, 'Bitte Kategorie auswählen.');
            return;
        }

        const rootTree = props.categoryTree.filter((categoryTree: ICategoryTree) => categoryTree.id === +mainCategoryId);

        unitBlurHandler();
        unitChangeHandler(undefined, rootTree[0].unit);
    };

    return (
        <form onSubmit={onSubmitHandler} className={classes['stock-form']}>
            <Input
                id="name"
                label="Bezeichnung"
                inputHasErrors={nameHasError}
                inputProps={{
                    type: 'text',
                    required: true,
                    placeholder: 'Bezeichnung eingeben',
                    value: nameValue,
                    onBlur: nameBlurHandler,
                    onChange: nameChangeHandler,
                    onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                }}
                noticeProps={{
                    show: true,
                    text: 'Bitte einen gültigen Wert für "Bezeichnung" eingeben.',
                }}
            />

            <div className={classes.col1}>
                <Select
                    id="category"
                    label="Kategorie"
                    selectHasErrors={categoryRef.current && !ValidCategory(categoryRef.current.value) ? true : false}
                    onChangeHandler={onCategoryChangeHandler}
                    selectProps={{
                        defaultValue: `${props.initialValue.parentCategoryId}__${props.initialValue.categoryId}`,
                    }}
                    items={buildNestedCategorySelect()}
                    ref={categoryRef}
                />

                <Input
                    id="unit"
                    label="Einheit"
                    inputHasErrors={unitHasError}
                    inputProps={{
                        type: 'text',
                        required: true,
                        readOnly: true,
                        value: unitValue,
                    }}
                    noticeProps={{
                        show: false,
                        text: '',
                    }}
                />
            </div>

            <FlexContainer>
                <Input
                    id="stock"
                    label="Bestand"
                    inputHasErrors={stockHasError}
                    inputProps={{
                        type: 'number',
                        required: true,
                        placeholder: 'Bestand',
                        value: stockValue,
                        onBlur: stockBlurHandler,
                        onChange: stockChangeHandler,
                        onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                    }}
                    noticeProps={{
                        show: true,
                        text: 'Bitte einen gültigen Wert für "Bestand" eingeben.',
                    }}
                />
                <Input
                    id="capacity"
                    label="Kapazität"
                    inputHasErrors={capacityHasError}
                    inputProps={{
                        type: 'number',
                        step: '0.10',
                        required: true,
                        placeholder: 'Kapazität',
                        value: capacityValue,
                        onBlur: capacityBlurHandler,
                        onChange: capacityChangeHandler,
                        onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                    }}
                    noticeProps={{
                        show: true,
                        text: 'Bitte einen gültigen Wert für "Kapazität" eingeben.',
                    }}
                />
                <Input
                    id="overall"
                    label="Gesamt"
                    inputHasErrors={stockHasError || capacityHasError}
                    inputProps={{
                        type: 'number',
                        readOnly: true,
                        required: true,
                        placeholder: 'Gesamtkapazität',
                        value: (parseInt(stockValue) * parseFloat(`${capacityValue}`.replace(',', '.'))).toFixed(2),
                    }}
                    noticeProps={{ show: false, text: '' }}
                />
            </FlexContainer>

            <Input
                id="expiry"
                label="Ablaufdatum"
                inputHasErrors={expiryHasError}
                inputProps={{
                    type: 'date',
                    placeholder: 'Ablaufdatum',
                    value: expiryValue,
                    onBlur: expiryBlurHandler,
                    onChange: expiryChangeHandler,
                    onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                }}
                noticeProps={{
                    show: false,
                    text: '',
                }}
            />

            {isSubmitError && <ContentCard>{submitError}</ContentCard>}

            <ButtonCard>
                <Button buttonType={ButtonType.BACK} onClickHandler={() => navigate(-1)}>
                    ABBRECHEN
                </Button>
                <Button
                    buttonType={formIsValid ? ButtonType.PRIMARY : ButtonType.DISABLED}
                    buttonProps={{ type: 'submit', disabled: !formIsValid }}
                >
                    {props.create ? 'ERSTELLEN' : 'ÄNDERN'}
                </Button>
            </ButtonCard>
        </form>
    );
};

export default StockForm;
