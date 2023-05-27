import {
    ChangeEvent,
    CSSProperties,
    Dispatch,
    ReactNode,
    SetStateAction,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";

export type ThemeTypes = "primary" | "secondary" | "danger";

// Modal
export type ModalProps = {
    children: ReactNode;
    close?: () => void;
    style?: CSSProperties;
    className?: string;
    label?: string;
    withoutBackdrop?: boolean;
    withoutBackdropShadow?: boolean;
    centered?: boolean;
};

export type UseModalReturn = [boolean, () => void, () => void];

// useInput
export interface InputExtras {
    [key: string]: { isError?: boolean; message?: string };
}

export type UseInputsReturn = [
    any,
    (
        // eslint-disable-next-line
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => void,
    Dispatch<SetStateAction<any>>,
    {
        extras: InputExtras;
        validate: () => boolean;
        initialInputs: DynamicObject | unknown;
    }
];

export interface DynamicObject {
    [key: string]: unknown;
}

export type InitialInputStructure = {
    value: unknown;
    required?: boolean;
    message?: string;
    isEmail?: boolean;
    extraValidations: {
        validator: () => boolean;
        message?: string;
    };
};

export type StructuredInputData = {
    [key: string]: InitialInputStructure;
};

export type InitialInputData = StructuredInputData | DynamicObject | unknown;

// Page loader
export type UsePageLoaderReturn = {
    isPageLoading: boolean;
};

// Input handler Props
export interface CommonInputHandlerProps {
    element?: "input" | "textarea";
    error?: boolean;
    message?: string;
    variant?: "primary" | "secondary";
}

export interface InputHandlerInputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        CommonInputHandlerProps {}

export interface InputHandlerTextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement>,
        CommonInputHandlerProps {}

export type InputHandlerProps = InputHandlerInputProps &
    InputHandlerTextAreaProps;

// Tooltip
export type TooltipProps = {
    children?: ReactNode;
    title: string;
    enterDelay?: number;
};

export type MenuItem = {
    name: string;
    icon?: any;
    link?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export type MenuItems = MenuItem[];

export type MenusProps = {
    children: ReactNode;
    items: MenuItems;
    withClosableWrapper?: boolean;
};

export type SkeletonProps = {
    style?: React.CSSProperties;
    height?: string;
    width?: string;
};
