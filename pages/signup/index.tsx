import type { NextPageWithLayout } from "../_app";
import Login from "../../Components/Pages/Login/Login";
import { ReactElement } from "react";

const SignupPage: NextPageWithLayout = () => {
    return <Login type="signup" />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};

export default SignupPage;
