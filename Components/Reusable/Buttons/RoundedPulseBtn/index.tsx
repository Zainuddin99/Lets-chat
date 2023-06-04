import combineClasses from "../../../../utils/combineClasses";
import { StyledButtonProps } from "../types";
import classes from "./roundedPulseBtn.module.scss";

function RoundedPulseBtn({
    content,
    onClick,
    className,
    style,
    children,
}: StyledButtonProps) {
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
