import { PropsWithChildren } from 'react';
import classes from './Text.module.css';

const Text = (props: PropsWithChildren) => {
    return <span className={classes.text}>{props.children}</span>;
};

export default Text;
