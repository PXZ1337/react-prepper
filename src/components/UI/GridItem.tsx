import classes from './GridItem.module.css'

interface GridItemProps {
    onClickHandler: () => void,
    classNames: string[]
    children: any
}

const GridItem = (props: GridItemProps) => {
    return <div onClick={props.onClickHandler} className={`${classes['grid-item']} ${props.classNames.join(' ')}`}>
        {props.children}
    </div>
}

export default GridItem