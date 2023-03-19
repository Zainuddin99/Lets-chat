import { TooltipProps } from "../../../TS Types/utils.types";
import classes from "./tooltip.module.scss";

function Tooltip({ children, title }: TooltipProps) {
    return (
        <div className={classes.container}>
            {children}
            <div className={classes.content}>{title}</div>
        </div>
    );
}

export default Tooltip;
