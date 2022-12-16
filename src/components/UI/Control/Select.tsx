import React, { InputHTMLAttributes, SyntheticEvent } from 'react'
import classes from './Select.module.css'

interface SelectOptionProps {
    value: string
    label: string
}
interface SelectGroup {
    value: string
    label: string
    options: SelectOptionProps[]
}

interface SelectProps {
    id: string,
    label: string
    selectProps: InputHTMLAttributes<HTMLSelectElement>
    items: SelectGroup[]
    selectHasErrors: boolean
    onChangeHandler: (event: SyntheticEvent) => void
}


const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const optGroups = props.items.map((optgroup: SelectGroup) => {
        return <SelectOptionGroup key={optgroup.label} label={optgroup.label} value={optgroup.value} options={optgroup.options} />
    })

    const onChange = (event: SyntheticEvent) => {
        props.onChangeHandler(event)
    }

    return <div className={classes.select}>
        <label htmlFor={props.id}>{props.label}</label>
        <select className={props.selectHasErrors ? 'invalid-form-field' : ''} onChange={onChange} ref={ref} id={props.id}  {...props.selectProps}>{optGroups}</select>
    </div>
})

const SelectOptionGroup = (props: SelectGroup) => {
    const options = props.options.map((option: SelectOptionProps) => {
        return <SelectOption key={option.value} value={`${props.value}__${option.value}`} label={option.label} />
    })

    return <optgroup label={props.label}>
        {options}
    </optgroup>
}

const SelectOption = (props: SelectOptionProps) => {
    return <option value={props.value}>{props.label}</option>
}

export default Select