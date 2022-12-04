import classes from './Button.module.css'

interface ButtonProps {
    classNames: string[],
    onClick?: any,
    children: React.ReactNode
}

const Button = (props: ButtonProps) => {
    return <button type="submit" onClick={props.onClick} className={`${classes.button} ${props.classNames.join(' ')}`}>{props.children}</button>
}

export default Button