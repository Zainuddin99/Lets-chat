import classes from "./Login.module.scss";

function SignupMessage() {
    return (
        <div className={classes.signupMessage}>
            Signed up successfully...Email has been sent to you please verify it
            (Kindly check spam also).
        </div>
    );
}

export default SignupMessage;
