import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

interface BackdropProps {
    onClosedHandler: () => void
}

const Backdrop = (props: BackdropProps) => {
    return <div onClick={props.onClosedHandler} className={classes.backdrop} />
}

const portalElement = document.getElementById('overlays')!

const ModalOverlay = (props: any) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

interface ModalProps {
    onClosedHandler: () => void,
    children: any
}

const Modal = (props: ModalProps) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClosedHandler={props.onClosedHandler} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    )
}

export default Modal