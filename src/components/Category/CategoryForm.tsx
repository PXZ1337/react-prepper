import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategoryDTO, ICategoryInputDTO, ICategoryTreeNode, ISubCategoryCreateDTO, ISubCategoryDTO } from '../../common/dto/CategoryDTOs';
import NotEmpty from '../../common/validation/NotEmpty';
import ValidUnit from '../../common/validation/ValidUnit';
import ValueBetween from '../../common/validation/ValueBetween';
import useInput from '../../hooks/use-input';
import ButtonCard from '../UI/Card/ButtonCard';
import FlexContainer from '../UI/Container/FlexContainer';
import Button, { ButtonType } from '../UI/Control/Button';
import Input from '../UI/Control/Input';
import Headline, { HeadlineType } from '../UI/Misc/Headline';
import classes from './CategoryForm.module.css';
import SubCategoryForm from './SubCategory/SubCategoryForm';

interface CategoryFormProps {
    onSubmitHandler: (updateEventData: CategoryUpdateEventData) => void;
    create?: boolean;
    initialValue: ICategoryDTO;
    subCategories: ICategoryTreeNode[];
}

export interface CategoryUpdateEventData {
    categoryInputDTO: ICategoryInputDTO;
    addedSubCategoryDTOs: ISubCategoryCreateDTO[];
    updatedSubCategoryDTOs: ISubCategoryDTO[];
    deletedSubCategoryIds: string[];
}

const CategoryForm = (props: CategoryFormProps) => {
    const navigate = useNavigate();

    const [subCategoryFormIsValid, setSubCategoryFormIsValid] = useState(false);
    const [addedSubCategories, setAddedSubCategories] = useState<ISubCategoryDTO[]>([]);
    const [updatedSubCategories, setUpdatedSubCategories] = useState<ISubCategoryDTO[]>([]);
    const [deletedSubCategoryIds, setDeletedSubCategoryIds] = useState<string[]>([]);

    const {
        value: nameValue,
        hasError: nameHasError,
        isValid: nameIsValid,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler,
    } = useInput(NotEmpty, props.initialValue.name);

    const {
        value: goalValue,
        hasError: goalHasError,
        isValid: goalIsValid,
        inputBlurHandler: goalBlurHandler,
        valueChangeHandler: goalChangeHandler,
    } = useInput((value: number) => ValueBetween(value, 0.01, 10000), props.initialValue.goal);

    const { value: unitValue, hasError: unitHasError, isValid: unitIsValid } = useInput(ValidUnit, props.initialValue.unit);

    let formIsValid = nameIsValid && goalIsValid && unitIsValid && subCategoryFormIsValid;

    const onSubmitHandler = async (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const eventData: CategoryUpdateEventData = {
            categoryInputDTO: {
                name: nameValue,
                goal: +goalValue,
                unit: props.initialValue.unit,
            },
            addedSubCategoryDTOs: addedSubCategories.map((category: ISubCategoryDTO) => {
                return { name: category.name, parent: category.parent };
            }),
            updatedSubCategoryDTOs: updatedSubCategories,
            deletedSubCategoryIds,
        };
        props.onSubmitHandler(eventData);
    };

    const addOrUpdate = (list: any[], key: string, value: object): any[] => {
        const index = list.findIndex((category: ISubCategoryDTO) => category.id === key);
        const elements = [...list];

        if (index !== -1) {
            elements[index] = value;
        } else {
            elements.push(value);
        }

        return elements;
    };

    const onSubCategoryAddedHandler = (added: ISubCategoryDTO) => {
        setSubCategoryFormIsValid(formIsValid);
        setAddedSubCategories(addOrUpdate(addedSubCategories, added.id, added));
    };

    const onSubCategoryUpdatedHandler = (updated: ISubCategoryDTO) => {
        setSubCategoryFormIsValid(formIsValid);
        setUpdatedSubCategories(addOrUpdate(updatedSubCategories, updated.id, updated));
    };

    const onSubCategoryDeletedHandler = (categoryId: string, tempCategory: boolean) => {
        // Remove only temporary categories from queue (not saved yet)
        if (tempCategory) {
            const categories = [...addedSubCategories];
            const index = addedSubCategories.findIndex((category) => category.id === categoryId);
            categories.splice(index, 1);
            setUpdatedSubCategories(categories);
        } else {
            // Add deletion operation to queue
            const deletedIds = [...deletedSubCategoryIds];
            deletedIds.push(categoryId);
            setDeletedSubCategoryIds(deletedIds);

            // Remove also from updated queue
            const index = updatedSubCategories.findIndex((category) => category.id === categoryId);
            if (index !== -1) {
                const categories = [...updatedSubCategories];
                categories.splice(index, 1);
            }
        }
    };

    // Prevent stucking on scroll position on mobile devices after the software keyboard opens.
    // In that case scrolling would only be possible when the keyboard remains open.
    // Scroll happens automatically when the user focused the input and the keyboard opens.
    useEffect(() => {
        document.body.style.overflowY = 'auto';

        return () => {
            document.body.style.overflowY = 'hidden';
        };
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className={classes['category-form']}>
            <Input
                id="name"
                label="Name"
                inputHasErrors={nameHasError}
                inputProps={{
                    type: 'text',
                    required: true,
                    placeholder: 'Name eingeben',
                    value: nameValue,
                    onBlur: nameBlurHandler,
                    onChange: nameChangeHandler,
                    onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                }}
                noticeProps={{
                    show: true,
                    text: 'Bitte einen gültigen Wert für "Name" eingeben.',
                }}
            />

            <FlexContainer>
                <Input
                    id="goal"
                    label="Ziel"
                    inputHasErrors={goalHasError}
                    inputProps={{
                        type: 'number',
                        step: '0.10',
                        required: true,
                        placeholder: 'Ziel eingeben',
                        value: goalValue,
                        onBlur: goalBlurHandler,
                        onChange: goalChangeHandler,
                        onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                    }}
                    noticeProps={{
                        show: true,
                        text: 'Bitte einen gültigen Wert für "Ziel" eingeben.',
                    }}
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
            </FlexContainer>

            <Headline type={HeadlineType.PRIMARY} caption={`bearbeiten`}>
                Unter-Kategorien
            </Headline>

            <SubCategoryForm
                parentCategoryId={props.initialValue.id}
                subCategories={props.subCategories}
                onAddedHandler={onSubCategoryAddedHandler}
                onUpdatedHandler={onSubCategoryUpdatedHandler}
                onDeletedHandler={onSubCategoryDeletedHandler}
                onFormStateChanged={(state: boolean) => setSubCategoryFormIsValid(state)}
            />

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

export default CategoryForm;
