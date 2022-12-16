import { ButtonHTMLAttributes } from 'react'
import classes from './Button.module.css'

export enum ButtonType {
    PRIMARY = 'color4',
    SECONDARY = 'dark',
    BACK = 'color3',
    DISABLED = 'disabled'
}

interface ButtonProps {
    onClickHandler?: () => void
    buttonType: string
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
    children: any
}

const Button = (props: ButtonProps) => {
    return <button type="button" {...props.buttonProps} onClick={props.onClickHandler} className={`${classes.button} ${props.buttonType}`}>
        {props.children}
    </button>
}

export default Button