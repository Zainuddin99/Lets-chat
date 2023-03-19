import { InputHTMLAttributes } from "react";

import combineClasses from "../../../../utils/combineClasses";
import classes from "./checkbox.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

function Checkbox({ label, ...rest }: Props) {
    return (
        <div
            className={combineClasses(
                classes["checkbox-wrapper-9"],
                "flex-fs-c"
            )}
        >
            <div>
                <input
                    className={combineClasses(
                        classes["tgl"],
                        classes["tgl-flat"]
                    )}
                    id="cb4-9"
                    type="checkbox"
                    {...rest}
                    value={rest.checked ? "off" : "on"}
                />
                <label
                    className={classes["tgl-btn"]}
                    htmlFor="cb4-9"
                ></label>
            </div>
            {label && (
                <label
                    style={{ cursor: "pointer" }}
                    htmlFor="cb4-9"
                >
                    {label}
                </label>
            )}
        </div>
    );
}

export default Checkbox;
