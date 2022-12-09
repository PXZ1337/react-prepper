export const initialInputState: IInputState = {
    value: '',
    isTouched: false,
};

export interface IInputState {
    value: number | string,
    isTouched: boolean
}

export enum InputActionType {
    INPUT, BLUR, RESET
}

export interface IInputAction {
    type: InputActionType,
    payload?: any
}
