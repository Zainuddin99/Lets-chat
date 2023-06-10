import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import classes from "./Login.module.scss";
import { validateEmail } from "../../../utils/functions";
import {
    createUser,
    sendPasswordRestLink,
    signInUser,
} from "../../../Firebase/auth";
import { notify } from "../../../utils/notify";
import { Inputs, LoginProps } from "../../../TS Types/login.types";
import { useInputs } from "../../../customHooks/useInputs";
import LoginHeader from "./LoginHeader";
import combineClasses from "../../../utils/combineClasses";
import Button from "../../Reusable/Buttons/Button";
import { loginSuccessMessages } from "../../../Constants/main";

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
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [errors, setErrors] = useState(initialInputs);

    const router = useRouter();

    useEffect(() => {
        setInputs(initialInputs);
    }, [type, setInputs]);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { email, password, firstName, lastName }: Inputs = inputs;
        setSubmitting(true);
        try {
            if (type === "signup") {
                await createUser(email, password, firstName, lastName);
                setSuccessMessage(loginSuccessMessages.signUp);
                notify("success", "Successfully signed up");
                setInputs(initialInputs);
            } else if (type === "login") {
                await signInUser(email, password);
                notify("success", "Successfully logged in");
                router.push("/");
            } else if (type === "forgotPassword") {
                await sendPasswordRestLink(email);
                setSuccessMessage(loginSuccessMessages.forgotPassword);
                notify("success", "Successfully sent email");
                setInputs(initialInputs);
            }
        } catch (error: any) {
            notify(
                "danger",
                error.code || error.message || "Something went wrong!"
            );
        }
        setSubmitting(false);
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

    const { email, confirmPassword, password } = inputs;

    useEffect(() => {
        setErrors((prev) => ({
            ...prev,
            email: email && !validateEmail(email) ? "Enter valid email!" : "",
        }));
    }, [email]);

    useEffect(() => {
        setErrors((prev) => ({
            ...prev,
            confirmPassword:
                confirmPassword && password !== confirmPassword
                    ? "Password must be same"
                    : "",
        }));
    }, [confirmPassword, password]);

    return (
        <div className={`${classes.sideContainer} ${classes[type]}`}>
            <LoginHeader type={type} />

            <div className={combineClasses(classes.container, "shadow-basic")}>
                {successMessage && (
                    <div className={classes.signupMessage}>
                        {successMessage} (Kindly check spam also)
                    </div>
                )}

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

                    <Button
                        className="primary full"
                        disabled={disabledSubmit}
                        loading={submitting}
                    >
                        Submit
                    </Button>

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
