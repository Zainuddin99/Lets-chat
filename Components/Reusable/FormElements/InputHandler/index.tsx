import combineClasses from "../../../../utils/combineClasses";
import classes from "./inputHandler.module.scss";
import { InputHandlerProps } from "../../../../TS Types/utils.types";

function InputHandler({
    element,
    error,
    message,
    variant = "primary",
    ...rest
}: InputHandlerProps) {
    rest.className = combineClasses(variant, rest.className);

    return (
        <div
            style={{ width: "100%" }}
            className={combineClasses(error && classes["error"])}
        >
            {element === "textarea" ? (
                <textarea {...rest} />
            ) : (
                <input {...rest} />
            )}
            {message && (
                <div className={combineClasses(classes["message"], "bold")}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default InputHandler;
