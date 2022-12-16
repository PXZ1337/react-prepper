import classes from "./Headline.module.css"

export enum HeadlineType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'

}

interface HeadlineProps {
    type: HeadlineType
    children: any
    caption?: string
}

const Headline = (props: HeadlineProps) => {
    return <div className={classes.headline}>
        <span className={classes[props.type]}>{props.children}</span>
        {props.caption && <span className={classes.caption}>{props.caption}</span>}
    </div>
}

export default Headline