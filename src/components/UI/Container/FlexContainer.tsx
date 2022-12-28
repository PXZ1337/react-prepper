import classes from './FlexContainer.module.css';

const Container = (props: any) => {
    return <div className={classes['flex-container']}>{props.children}</div>;
};

export default Container;
