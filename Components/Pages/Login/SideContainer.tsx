import classes from "./Login.module.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { isObjectsEqual, validateEmail } from "../../../utils/functions";
import {
    createUser,
    sendPasswordRestLink,
    signInUser,
} from "../../../Firebase/auth";
import { notify } from "../../../utils/notify";
import { Inputs, LoginProps } from "../../../TS Types/login.types";
import { useInputs } from "../../../customHooks/useInputs";
import { useRouter } from "next/router";
import SignupMessage from "./SignupMessage";
import Link from "next/link";
import LoginHeader from "./LoginHeader";

const initialInputs = {
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
};

function SideContainer({ type }: LoginProps) {
    const [inputs, handleInputsChange, setInputs] = useInputs(initialInputs);
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
    const [showSignupMessage, setShowSignupMessage] = useState<boolean>(false);
    const [errors, setErrors] = useState(initialInputs);

    const router = useRouter();

    //To add default inputs when inputs have changed
    const defaultInputs = () => {
        if (!isObjectsEqual(initialInputs, inputs)) {
            setInputs(initialInputs);
        }
    };

    useEffect(() => {
        defaultInputs();
    }, [type]);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { email, password, firstName, lastName }: Inputs = inputs;
        setDisabledSubmit(true);
        try {
            if (type === "signup") {
                await createUser(email, password, firstName, lastName);
                notify("success", "Successfully signed up");
                setShowSignupMessage(true);
                defaultInputs();
            } else if (type === "login") {
                await signInUser(email, password);
                notify("success", "Successfully logged in");
                defaultInputs();
                router.push("/");
            } else if (type === "forgotPassword") {
                await sendPasswordRestLink(email);
                notify("success", "Successfully sent email");
                router.push("/login");
            }
        } catch (error: any) {
            notify(
                "danger",
                error.code || error.message || "Something went wrong!"
            );
        }
        setDisabledSubmit(false);
    };

    useEffect(() => {
        const validateForm = (): void => {
            const { email, password, confirmPassword, firstName, lastName } =
                inputs;
            if (
                email &&
                validateEmail(email) &&
                //For login and signup page
                (type !== "forgotPassword"
                    ? password &&
                      //If the page is signup only add addintional check
                      (type === "signup"
                          ? password === confirmPassword &&
                            firstName &&
                            lastName
                          : true)
                    : true)
            ) {
                setDisabledSubmit(false);
            } else {
                setDisabledSubmit(true);
            }
        };
        validateForm();
    }, [inputs, type]);

    useEffect(() => {
        const { email } = inputs;
        setErrors((prev) => ({
            ...prev,
            email: email && !validateEmail(email) ? "Enter valid email!" : "",
        }));
    }, [inputs.email]);

    useEffect(() => {
        const { confirmPassword, password } = inputs;
        setErrors((prev) => ({
            ...prev,
            confirmPassword:
                confirmPassword && password !== confirmPassword
                    ? "Password must be same"
                    : "",
        }));
    }, [inputs.confirmPassword, inputs.password]);

    return (
        <div className={`${classes.sideContainer} ${classes[type]}`}>
            <LoginHeader type={type} />

            <div className={classes.container}>
                {showSignupMessage && <SignupMessage />}

                <div className={classes.heading}>
                    {type === "login"
                        ? "LOGIN"
                        : type === "signup"
                        ? "SIGN UP"
                        : "Forgot password?"}
                </div>

                <form
                    className={"flexcol-c-u"}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.inputContainer}>
                        <input
                            type="email"
                            onChange={handleInputsChange}
                            name="email"
                            required
                            value={inputs.email}
                            className={`secondary`}
                            autoComplete="off"
                            placeholder="Email *"
                        />
                        {errors.email && (
                            <div className={classes.validationError}>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {type !== "forgotPassword" && (
                        <input
                            type="password"
                            onChange={handleInputsChange}
                            value={inputs.password}
                            required
                            name="password"
                            className={`secondary`}
                            placeholder="Password *"
                        />
                    )}

                    {type === "signup" && (
                        <>
                            <div className={classes.inputContainer}>
                                <input
                                    type="password"
                                    onChange={handleInputsChange}
                                    value={inputs.confirmPassword}
                                    required
                                    name="confirmPassword"
                                    className={`secondary`}
                                    placeholder="Confirm password *"
                                />
                                {errors.confirmPassword && (
                                    <div className={classes.validationError}>
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>

                            <input
                                type="text"
                                onChange={handleInputsChange}
                                value={inputs.firstName}
                                required
                                name="firstName"
                                className={`secondary`}
                                placeholder="First Name *"
                            />

                            <input
                                type="text"
                                onChange={handleInputsChange}
                                value={inputs.lastName}
                                required
                                name="lastName"
                                className={`secondary`}
                                placeholder="Last Name *"
                            />
                        </>
                    )}

                    <button disabled={disabledSubmit}>Submit</button>

                    {type === "login" && (
                        <div className={classes.forgotPasswordLink}>
                            <Link href={"/forgot-password"}>
                                Forgot password?
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SideContainer;
