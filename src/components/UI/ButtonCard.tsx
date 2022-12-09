import classes from './ButtonCard.module.css'

const ButtonCard = (props: any) => {
    return <div className={classes.card}>
        {props.children}
    </div>
}

export default ButtonCard