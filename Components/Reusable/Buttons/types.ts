import { ReactElement } from "react";
import { ThemeTypes } from "../../../TS Types/utils.types";

export type ButtonProps = {
    content?: React.ReactElement | string;
    children?: React.ReactNode;
    onClick?: () => unknown;
    className?: string;
    style?: React.CSSProperties;
    icon?: ReactElement | string;
    type?: ThemeTypes;
} & React.HTMLProps<HTMLButtonElement>;
