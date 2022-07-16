import { ModalProps } from "../TS Types/utils.types"

function Modal({ children, style, animate, close, className, label }: ModalProps) {
    return (
        <>
            <div className="modal-wrapper" onClick={close}></div>
            <div className={`modal-container ${animate || 'fade-down'} ${className || ''}`} style={style}>
                {
                    label && <>
                        <div className="label">{label}</div>
                    </>
                }
                {children || "Modal"}
            </div>
        </>
    )
}

export default Modal