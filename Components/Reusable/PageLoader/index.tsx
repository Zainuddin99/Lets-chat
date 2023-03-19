import React from "react";
import classes from "./PageLoader.module.scss";

function PageLoader() {
    return (
        <div className={classes["container"]}>
            <div className={classes["spinner"]}></div>
        </div>
    );
}

export default PageLoader;
