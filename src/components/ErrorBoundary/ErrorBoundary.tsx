import classes from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
    caption: string
    message: string
}

const ErrorBoundary = (props: ErrorBoundaryProps) => {
    return (
        <div className={classes.error}>
            <h3 className={classes['caption']}>{props.caption}</h3>
            <div className={classes['message']}><i>{props.message}</i></div>
        </div>
    );
}

export default ErrorBoundary