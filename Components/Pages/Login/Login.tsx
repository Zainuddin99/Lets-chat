import Image from "next/image";
import { LoginProps } from "../../../TS Types/login.types";
import classes from "./Login.module.scss";
import SideContainer from "./SideContainer";

function Login({ type }: LoginProps) {
    return (
        <div className={classes.main}>
            <div className={classes.mainImgContainer}>
                <Image
                    src="/main.jpg"
                    alt="Lets chat"
                    title="Lets chat"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <SideContainer type={type} />
        </div>
    );
}

export default Login;
