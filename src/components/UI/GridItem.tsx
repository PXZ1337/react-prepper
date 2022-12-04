import classes from './GridItem.module.css'

const GridItem = (props: any) => {
    return <div className={`${classes['grid-item']} ${props.classNames.join(' ')}`}>{props.children}</div>
}

export default GridItem