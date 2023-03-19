import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UsePageLoaderReturn } from "../TS Types/utils.types";

export const usePageLoader = (): UsePageLoaderReturn => {
    const router = useRouter();

    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) =>
            url !== router.asPath && setIsPageLoading(true);
        const handleComplete = (url: string) =>
            url === router.asPath && setIsPageLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    });

    return { isPageLoading };
};
