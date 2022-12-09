import { BaseSyntheticEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategoryById } from "../../api/category"
import { ICategoryTree, ICategoryTreeNode, ICategoryDTO } from "../../common/dto/CategoryDTOs"
import { IStockInputDTO } from "../../common/dto/StockDTOs"
import NotEmpty from "../../common/validation/NotEmpty"
import ValidCategory from "../../common/validation/ValidCategory"
import ValidUnit from "../../common/validation/ValidUnit"
import ValueBetween from "../../common/validation/ValueBetween"
import useInput from "../../hooks/use-input"
import Button, { ButtonType } from "../UI/Button"
import ButtonCard from "../UI/ButtonCard"
import ContentCard from "../UI/ContentCard"
import Input from "../UI/Input"
import Select from "../UI/Select"
import classes from "./StockForm.module.css"

interface StockFormProps {
    onSubmitHandler: (stock: IStockInputDTO) => void
    categoryTree: ICategoryTree[],
    stock?: IStockInputDTO
}

const StockForm = (props: StockFormProps) => {
    const categoryRef = useRef<HTMLSelectElement>(null)
    const navigate = useNavigate()

    const [isSubmitError, setIsSubmitError] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const {
        value: nameValue,
        hasError: nameHasError,
        isValid: nameIsValid,
        inputBlurHandler: nameBlurHandler,
        valueChangeHandler: nameChangeHandler
    } = useInput(NotEmpty, props.stock ? props.stock.name : null)

    const {
        value: unitValue,
        hasError: unitHasError,
        isValid: unitIsValid,
        inputBlurHandler: unitBlurHandler,
        valueChangeHandler: unitChangeHandler
    } = useInput(ValidUnit, props.stock ? props.stock.unit : null)

    const {
        value: stockValue,
        hasError: stockHasError,
        isValid: stockIsValid,
        inputBlurHandler: stockBlurHandler,
        valueChangeHandler: stockChangeHandler
    } = useInput((value: number) => ValueBetween(value, 1, 10000), props.stock ? props.stock.stock : null)

    const {
        value: capacityValue,
        hasError: capacityHasError,
        isValid: capacityIsValid,
        inputBlurHandler: capacityBlurHandler,
        valueChangeHandler: capacityChangeHandler
    } = useInput((value: number) => ValueBetween(value, 1, 10000), props.stock ? props.stock.capacity : null)

    const {
        value: expiryValue,
        hasError: expiryHasError,
        isValid: expiryIsValid,
        inputBlurHandler: expiryBlurHandler,
        valueChangeHandler: expiryChangeHandler
    } = useInput((dateString: string) => {
        return !isNaN(Date.parse(dateString))
    }, props.stock ? props.stock.durable : null)

    let formIsValid = nameIsValid && unitIsValid && stockIsValid && capacityIsValid && expiryIsValid && categoryRef.current && ValidCategory(categoryRef.current.value)

    const buildNestedCategorySelect = () => {
        const selectOptGroups = props.categoryTree.map((tree: ICategoryTree) => {
            return {
                value: tree.id.toString(),
                label: tree.name,
                options: tree.subCategories.map((subTree: ICategoryTreeNode) => {
                    return {
                        label: subTree.name,
                        value: subTree.id.toString()
                    }
                })
            }
        })

        selectOptGroups.unshift({
            value: '0',
            label: 'default',
            options: [{
                value: '0',
                label: '--- Kategorie auswählen ---'
            }]
        })

        return selectOptGroups
    }

    const getCategoryPreSelection = () => {
        if (props.stock) {
            return `${props.stock.parentCategoryId}__${props.stock.categoryId}`
        }

        return '0__0'
    }

    const onSubmitHandler = async (event: BaseSyntheticEvent) => {
        event.preventDefault()

        if (formIsValid && categoryRef.current !== null) {
            const [parentCategoryId, subCategoryId] = categoryRef.current.value.split('__')

            try {
                await props.onSubmitHandler({
                    name: nameValue,
                    stock: parseInt(stockValue),
                    capacity: parseInt(capacityValue),
                    abs: parseInt(stockValue) * parseInt(capacityValue),
                    parentCategoryId: parseInt(parentCategoryId),
                    categoryName: categoryRef.current.options[categoryRef.current.selectedIndex].text,
                    categoryId: parseInt(subCategoryId),
                    unit: unitValue,
                    dateModified: new Date().toISOString(),
                    durable: expiryValue.toString(),
                })
            } catch (error) {
                setIsSubmitError(true)
                setSubmitError(`${error}`)
            }
        }
    }

    const onCategoryChangeHandler = async (event: BaseSyntheticEvent) => {
        const [mainCategoryId,] = event.target.value.split('__');

        if (mainCategoryId === '') {
            unitChangeHandler(undefined, '')
            return
        }

        const category: ICategoryDTO = await getCategoryById(mainCategoryId)
        if (!category.unit) {
            unitChangeHandler(undefined, '')
            return
        }

        unitBlurHandler()
        unitChangeHandler(undefined, category.unit)
    }

    return <form onSubmit={onSubmitHandler} className={classes['stock-form']}>
        <Input
            id='name'
            label='Bezeichnung'
            inputHasErrors={nameHasError}
            inputProps={{
                type: 'text',
                required: true,
                placeholder: 'Bezeichnung eingeben',
                value: nameValue,
                onBlur: nameBlurHandler,
                onChange: nameChangeHandler
            }}
            noticeProps={{
                show: true,
                text: 'Bitte einen gültigen Wert eingeben.'
            }} />


        <div className={classes.col1}>
            <Select
                id='category'
                label='Kategorie'
                selectHasErrors={categoryRef.current && !ValidCategory(categoryRef.current.value) ? true : false}
                onChangeHandler={onCategoryChangeHandler}
                selectProps={{
                    defaultValue: getCategoryPreSelection()
                }} items={buildNestedCategorySelect()} ref={categoryRef} />

            <Input
                id='unit'
                label='Einheit'
                inputHasErrors={unitHasError}
                inputProps={{
                    type: 'text',
                    required: true,
                    readOnly: true,
                    value: unitValue
                }}
                noticeProps={{
                    show: false,
                    text: ''
                }}
            />
        </div>


        <div className={classes.col1}>
            <Input
                id='stock'
                label='Bestand'
                inputHasErrors={stockHasError}
                inputProps={{
                    type: 'numeric',
                    required: true,
                    placeholder: 'Bestand',
                    value: stockValue,
                    onBlur: stockBlurHandler,
                    onChange: stockChangeHandler
                }}
                noticeProps={{
                    show: true,
                    text: 'Bitte einen gültigen Wert eingeben.'
                }} />
            <Input
                id='capacity'
                label='Kapazität'
                inputHasErrors={capacityHasError}
                inputProps={{
                    type: 'numeric',
                    required: true,
                    placeholder: 'Kapazität',
                    value: capacityValue,
                    onBlur: capacityBlurHandler,
                    onChange: capacityChangeHandler
                }}
                noticeProps={{
                    show: true,
                    text: 'Bitte einen gültigen Wert eingeben.'
                }} />
            <Input
                id='overall'
                label='Gesamt'
                inputHasErrors={stockHasError || capacityHasError}
                inputProps={{
                    type: 'numeric',
                    readOnly: true,
                    required: true,
                    placeholder: 'Gesamtkapazität',
                    value: (stockValue * capacityValue).toFixed()
                }}
                noticeProps={{ show: false, text: '' }} />
        </div>

        <Input
            id='expiry'
            label='Ablaufdatum'
            inputHasErrors={expiryHasError}
            inputProps={{
                type: 'date',
                required: true,
                placeholder: 'Ablaufdatum',
                value: expiryValue,
                onBlur: expiryBlurHandler,
                onChange: expiryChangeHandler
            }}
            noticeProps={{
                show: true,
                text: 'Bitte einen gültigen Wert eingeben.'
            }} />

        {isSubmitError && <ContentCard>{submitError}</ContentCard>}

        <ButtonCard>
            <Button buttonType={ButtonType.BACK} onClickHandler={() => navigate(-1)}>CANCEL</Button>
            <Button buttonType={formIsValid ? ButtonType.PRIMARY : ButtonType.DISABLED} buttonProps={{ type: "submit" }}>{props.stock ? 'ÄNDERN' : 'ERSTELLEN'}</Button>
        </ButtonCard>
    </form>
}

export default StockForm