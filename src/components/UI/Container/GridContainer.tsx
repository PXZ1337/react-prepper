import classes from './GridContainer.module.css'

const GridCointainer = (props: any) => {
    return <div className={classes.grid}>{props.children}</div>
}

export default GridCointainer