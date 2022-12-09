import classes from './ContentCard.module.css'

const ContentCard = (props: any) => {
    return <div className={classes.card}>
        {props.children}
    </div>
}

export default ContentCard