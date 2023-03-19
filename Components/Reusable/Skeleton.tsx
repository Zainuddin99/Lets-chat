import { SkeletonProps } from "../../TS Types/utils.types";
import classes from "./reusable.module.scss";

function Skeleton({ style, height, width }: SkeletonProps) {
    return (
        <div
            className={classes.skeleton}
            style={{ ...style, height, width }}
        ></div>
    );
}
export default Skeleton;
