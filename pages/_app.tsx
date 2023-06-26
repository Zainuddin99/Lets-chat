import type { AppProps } from "next/app";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

import "../styles/globals.scss";
import "../styles/customs.scss";
import "../styles/themes.scss";

import { dispatch, store } from "../Redux/store";
import { firebaseAuth } from "../Firebase/auth";
import PageLoader from "../Components/Reusable/PageLoader";
import { userEntryRoutes } from "../Constants/main";
import fetchSaveUserData from "../utils/fetchSaveUserData";
import MainLayout from "../Components/Layout/MainLayout";
import { userActions } from "../Redux/users";
import EntryLayout from "../Components/Layout/EntryLayout";

export type NextPageWithLayout = NextPage & {
    // eslint-disable-next-line
    getLayout?: (page: ReactElement) => ReactNode;
};

//Type of of main component
//Since it also has layout comming
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();
    const [authenticating, setAuthenticating] = useState<boolean>(true);
    // const { isPageLoading } = usePageLoader()

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            dispatch(userActions.toggleMode({ mode: "dark" }));
        }
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user || !user.emailVerified) {
                if (user && !user.emailVerified) {
                    fetchSaveUserData(user.uid);
                }
                if (!userEntryRoutes.includes(router.pathname)) {
                    router.push("/login");
                }
            } else {
                await fetchSaveUserData(user.uid);
                if (userEntryRoutes.includes(router.pathname)) {
                    router.push("/");
                }
            }
            setAuthenticating(false);
        });
    }, []);

    if (authenticating) {
        return <PageLoader />;
    }

    const getLayoutComponent = () => {
        // If already layout present then render it else render deafult ones
        if (Component.getLayout) {
            return Component.getLayout(<Component {...pageProps} />);
        }
        const Layout = userEntryRoutes.includes(router.pathname)
            ? EntryLayout
            : MainLayout;
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    };

    return (
        <Provider store={store}>
            <Head>
                <title>Lets chat</title>
                <meta
                    name="Lets chat"
                    content="Lets chat is the group chat app for free"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <ReactNotifications />
            {getLayoutComponent()}
        </Provider>
    );
}

export default MyApp;
