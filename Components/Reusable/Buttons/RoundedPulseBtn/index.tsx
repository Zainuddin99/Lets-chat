import combineClasses from "../../../../utils/combineClasses";
import { ButtonProps } from "../types";
import classes from "./roundedPulseBtn.module.scss";

function RoundedPulseBtn({
    content,
    onClick,
    className,
    style,
    children,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={combineClasses(
                classes.btn,
                "flex-c-c",
                "shadow",
                "small",
                className || ""
            )}
            style={style}
        >
            {content || children}
        </button>
    );
}

export default RoundedPulseBtn;
