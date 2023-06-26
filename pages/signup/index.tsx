import type { NextPageWithLayout } from "../_app";
import Login from "../../Components/Pages/Login/Login";

const SignupPage: NextPageWithLayout = () => {
    return <Login type="signup" />;
};

export default SignupPage;
