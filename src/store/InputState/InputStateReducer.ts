import { IInputAction, IInputState, initialInputState, InputActionType } from "./InputAction";

const inputStateReducer = (state: IInputState, action: IInputAction) => {
    switch (action.type) {
        case InputActionType.INPUT:
            return { value: action.payload.value, isTouched: state.isTouched }
        case InputActionType.BLUR:
            return { isTouched: true, value: state.value };
        case InputActionType.RESET:
            return { isTouched: false, value: '' };
        default:
            return initialInputState
    }
}

export default inputStateReducer