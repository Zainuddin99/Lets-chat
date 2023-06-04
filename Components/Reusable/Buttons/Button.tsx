import { ButtonProps } from "./types";
import classes from "./buttons.module.scss";
import combineClasses from "../../../utils/combineClasses";

function Button({
    loading,
    loadingText,
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <div
                    className={combineClasses(
                        classes.loader,
                        "relative full",
                        !loadingText && classes.noLoadingText
                    )}
                >
                    {loadingText || <span className="hidden">Hidden</span>}
                </div>
            ) : (
                children
            )}
        </button>
    );
}
export default Button;
