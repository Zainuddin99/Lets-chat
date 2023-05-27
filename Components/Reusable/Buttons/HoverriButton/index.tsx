import combineClasses from "../../../../utils/combineClasses";
import { ButtonProps } from "../types";
import classes from "./hoveriiButton.module.scss";

function HoveriiButton({
    content,
    icon,
    children,
    className,
    type = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            className={combineClasses(
                classes["cta"],
                "basic",
                className,
                classes[`btn-${type}`]
            )}
            {...props}
        >
            <span className="bold"> {children || content || "Click me"}</span>
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
        </button>
    );
}
export default HoveriiButton;
