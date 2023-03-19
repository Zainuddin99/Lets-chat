import { useRouter } from "next/router";
import React from "react";
import { LoginProps } from "../../../TS Types/login.types";
import classes from "./Login.module.scss";

function LoginHeader({ type }: LoginProps) {
    const router = useRouter();

    return (
        <div className={`${classes.signUpContainer}`}>
            {type === "login" ? (
                <>
                    Dont have an account?{" "}
                    <span onClick={() => router.push("/signup")}>Sign up</span>
                </>
            ) : (
                <>
                    Back to{" "}
                    <span onClick={() => router.push("login")}>Login</span>
                </>
            )}
        </div>
    );
}

export default LoginHeader;
