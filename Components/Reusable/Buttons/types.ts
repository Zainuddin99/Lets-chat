import { ReactElement } from "react";
import { ThemeTypes } from "../../../TS Types/utils.types";

type HTMLButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export type ButtonProps = {
    loading?: boolean;
    loadingText?: string;
} & HTMLButtonProps;

export type StyledButtonProps = {
    content?: React.ReactElement | string;
    icon?: ReactElement | string;
    btnType?: ThemeTypes;
} & ButtonProps;
