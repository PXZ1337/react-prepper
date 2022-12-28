import React, { InputHTMLAttributes, PropsWithChildren } from 'react';
import classes from './Input.module.css';

interface NoticeProps {
    show: boolean;
    text: string;
}

interface InputProps {
    id: string;
    inputHasErrors: boolean;
    label?: string;
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    noticeProps: NoticeProps;
}

const Input = React.forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>((props, ref) => {
    const className = props.inputHasErrors ? 'invalid-form-field' : '';

    return (
        <div className={classes.input}>
            {props.label && (
                <label className={className} htmlFor={props.id}>
                    {props.label}
                </label>
            )}
            <input className={className} ref={ref} id={props.id} {...props.inputProps} />
            {props.children}
            {props.noticeProps.show && props.inputHasErrors && <span className={className}>{props.noticeProps.text}</span>}
        </div>
    );
});

export default Input;
