import { useNavigate } from 'react-router-dom'
import classes from './Button.module.css'

interface ButtonProps {
    onClickHandler: () => void,
    children: any
}

const Button = (props: ButtonProps) => {
    const navigate = useNavigate()

    return <div onClick={props.onClickHandler} className={classes.button}>
        <p>{props.children}</p>
    </div>
}

export default Button