import Image from "next/image";
import classes from "./noPage.module.scss";

function NoPageFound() {
    return (
        <div className={classes.container}>
            <div className={classes.imageContainer}>
                <Image
                    alt="no-page-found"
                    src={"/404.jpg"}
                    layout="fill"
                    objectFit="fill"
                />
            </div>
        </div>
    );
}

export default NoPageFound;
