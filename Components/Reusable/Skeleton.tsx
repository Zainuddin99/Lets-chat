import { SkeletonProps } from "../../TS Types/utils.types";
import classes from "./reusable.module.scss";

function Skeleton({ style, height, width }: SkeletonProps) {
    return (
        <div>
            <div
                className={classes.skeleton}
                style={{ ...style, height, width }}
            ></div>
        </div>
    );
}
export default Skeleton;
