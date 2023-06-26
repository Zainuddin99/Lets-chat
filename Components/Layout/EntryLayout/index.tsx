import Mode from "../../Basics/Mode";
import { Layout } from "../types";
import classes from "./entryLayout.module.scss";

function EntryLayout({ children }: Layout) {
    return (
        <>
            <Mode className={classes.mode} />
            {children}
        </>
    );
}

export default EntryLayout;
