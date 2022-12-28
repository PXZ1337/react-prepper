import classes from './GridItem.module.css';

interface GridItemProps {
    onClickHandler?: () => void;
    classNames?: string[];
    children: any;
}

const GridItem = (props: GridItemProps) => {
    const classNames = (props.classNames ? props.classNames : []).concat([classes['grid-item']]);

    return (
        <div onClick={props.onClickHandler} className={classNames.join(' ')}>
            {props.children}
        </div>
    );
};

export default GridItem;
