import { AiOutlineClose } from "react-icons/ai";

import { ModalProps } from "../../../TS Types/utils.types";
import combineClasses from "../../../utils/combineClasses";
import classes from "./modal.module.scss";

function Modal({
    children,
    style,
    close,
    className,
    label,
    withoutBackdrop = false,
    withoutBackdropShadow = false,
    centered,
}: ModalProps) {
    return (
        <>
            {!withoutBackdrop && (
                <div
                    className={combineClasses(
                        classes["modal-wrapper"],
                        withoutBackdropShadow && classes["without-shadow"]
                    )}
                    onClick={close}
                ></div>
            )}
            <div
                className={combineClasses(
                    classes["modal-container"],
                    "shadow-high outlined-light",
                    className,
                    centered && "centered"
                )}
                style={style}
            >
                {label && (
                    <div
                        className={combineClasses(
                            "flex-sb-c",
                            classes["label"]
                        )}
                    >
                        <div>{label}</div>
                        {close && (
                            <AiOutlineClose
                                onClick={close}
                                className={classes["close-icon"]}
                            />
                        )}
                    </div>
                )}
                {children || "Modal"}
            </div>
        </>
    );
}

export default Modal;
