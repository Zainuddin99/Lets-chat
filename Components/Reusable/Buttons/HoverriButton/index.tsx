import combineClasses from "../../../../utils/combineClasses";
import Button from "../Button";
import { StyledButtonProps } from "../types";
import classes from "./hoveriiButton.module.scss";

function HoveriiButton({
    content,
    icon,
    loading,
    loadingText,
    children,
    className,
    btnType = "primary",
    disabled,
    ...props
}: StyledButtonProps) {
    return (
        <Button
            className={combineClasses(
                classes["cta"],
                "basic",
                className,
                classes[`btn-${btnType}`],
                loading && classes.loading
            )}
            disabled={disabled || loading}
            {...props}
        >
            <span className={combineClasses(classes.content, "bold")}>
                {" "}
                {(loading && loadingText) || children || content || "Click me"}
            </span>
            <span className={classes.icon}>
                {icon || (
                    <svg
                        width="13px"
                        height="10px"
                        viewBox="0 0 13 10"
                    >
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                )}
            </span>
        </Button>
    );
}
export default HoveriiButton;
