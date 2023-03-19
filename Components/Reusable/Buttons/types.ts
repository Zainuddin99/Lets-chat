import { ReactElement } from "react";

export type ButtonProps = {
    content?: ReactElement | string;
    children?: React.ReactNode;
    onClick?: () => unknown;
    className?: string;
    style?: React.CSSProperties;
};
