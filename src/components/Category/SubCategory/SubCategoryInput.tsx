import { BaseSyntheticEvent } from 'react';
import { MdClose } from 'react-icons/md';
import NotEmpty from '../../../common/validation/NotEmpty';
import useInput from '../../../hooks/use-input';
import GridItem from '../../UI/Container/Item/GridItem';
import Input from '../../UI/Control/Input';
import classes from '../SubCategory/SubCategoryInput.module.css';

interface SubCategoryInputProps {
    id: string;
    initialValue: string;
    placeholder: string;
    stockCount: number;
    onChangedHandler: (categoryId: string, value: string) => void;
    onRemovedHandler: (categoryId: string) => void;
}

const SubCategoryInput = (props: SubCategoryInputProps) => {
    const { value, isValid, inputBlurHandler, valueChangeHandler } = useInput(NotEmpty, props.initialValue);

    return (
        <GridItem classNames={[classes['category-item']]}>
            <Input
                id={`sub_category_${props.id}`}
                inputHasErrors={!isValid}
                inputProps={{
                    type: 'text',
                    required: true,
                    placeholder: props.placeholder,
                    value: value,
                    onBlur: inputBlurHandler,
                    onChange: (event: BaseSyntheticEvent) => {
                        valueChangeHandler(event);
                        props.onChangedHandler(props.id, event.target.value);
                    },
                    onFocus: (event: BaseSyntheticEvent) => event.target.select(),
                }}
                noticeProps={{
                    show: true,
                    text: 'Bitte einen gültigen Wert für "Name" eingeben.',
                }}
            >
                <span>{`Bestand: ${props.stockCount}`}</span>
            </Input>
            {props.stockCount === 0 && (
                <MdClose
                    data-testid="remove-category"
                    className={classes.remove}
                    onClick={() => {
                        if (window.confirm('Möchten Sie diese Kategorie wirklich entfernen?')) {
                            props.onRemovedHandler(props.id);
                        }
                    }}
                />
            )}
        </GridItem>
    );
};

export default SubCategoryInput;
