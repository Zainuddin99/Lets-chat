import type { NextPageWithLayout } from "../_app";
import Login from "../../Components/Pages/Login/Login";
import { ReactElement } from "react";

const ForgotPasswordPage: NextPageWithLayout = () => {
    return <Login type="forgotPassword" />;
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};

export default ForgotPasswordPage;
