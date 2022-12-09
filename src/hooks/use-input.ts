import { BaseSyntheticEvent, useReducer } from 'react';
import { initialInputState, InputActionType } from '../store/InputState/InputAction';
import inputStateReducer from '../store/InputState/InputStateReducer';

const useInput = (validateValue: (value: any) => boolean, initialValue: any) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        { ...initialInputState, value: initialValue }

    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event?: BaseSyntheticEvent, value?: any) => {
        dispatch({ type: InputActionType.INPUT, payload: { value: event ? event.target.value : value } });
    };

    const inputBlurHandler = () => {
        dispatch({ type: InputActionType.BLUR });
    };

    const resetHandler = () => {
        dispatch({ type: InputActionType.RESET });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetHandler,
    };
};

export default useInput;