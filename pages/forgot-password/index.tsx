import type { NextPageWithLayout } from "../_app";
import Login from "../../Components/Pages/Login/Login";

const ForgotPasswordPage: NextPageWithLayout = () => {
    return <Login type="forgotPassword" />;
};

export default ForgotPasswordPage;
