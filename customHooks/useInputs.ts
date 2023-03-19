import { ChangeEvent, useState } from "react";
import {
    DynamicObject,
    InitialInputData,
    InputExtras,
    UseInputsReturn,
} from "../TS Types/utils.types";
import { objectSize, validateEmail } from "../utils/functions";

const getInitialData = (
    inputs: InitialInputData
): { initialInputs: DynamicObject | unknown; extrasData: InputExtras } => {
    if (typeof inputs === "object") {
        const initialInputs: DynamicObject = {};
        const extrasData: InputExtras = {};
        for (const name in inputs) {
            const nameData = (inputs as any)[name];
            initialInputs[name] = nameData.value;
            extrasData[name] = {
                isError: false,
                message: nameData.message,
            };
        }
        return { initialInputs, extrasData };
    }
    return { initialInputs: inputs, extrasData: {} };
};

export const useInputs = (initialData: InitialInputData): UseInputsReturn => {
    const { initialInputs, extrasData } = getInitialData(initialData);

    const [inputs, setInputs] = useState(initialInputs);
    const [extras, setExtras] = useState(extrasData);

    const getValue = (value: string, type: string) => {
        if (type === "checkbox") return value === "on" ? true : false;
        return value;
    };

    const validate = () => {
        const errorData: InputExtras = {};
        if (typeof initialData === "object") {
            for (const name in initialData) {
                const { required, isEmail, extraValidations } = (
                    initialData as any
                )[name];
                if (required && !(inputs as any)[name].trim()) {
                    errorData[name] = {
                        isError: true,
                        message: "Field is required",
                    };
                } else if (isEmail) {
                    const email = (inputs as any)[name];
                    if (email && !validateEmail(email)) {
                        errorData[name] = {
                            isError: true,
                            message: "Please enter valid email",
                        };
                    }
                } else if (Array.isArray(extraValidations)) {
                    for (const data of extraValidations) {
                        const { validator, message } = data;
                        if (!validator((inputs as any)[name])) {
                            errorData[name] = {
                                isError: true,
                                message: message || "Validation failed",
                            };
                        }
                    }
                }
            }
            setExtras((prev) => ({ ...prev, ...errorData }));
        }
        return objectSize(errorData) ? false : true;
    };

    const handleInputsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        //handle both types differnetly
        if (inputs instanceof Object) {
            setInputs((prev: object) => ({
                ...prev,
                [name]: getValue(value, type),
            }));
            if (extras[name]?.isError) {
                setExtras((prev) => {
                    const data = prev[name];
                    data.isError = false;
                    data.message = (initialData as any)[name].message;
                    return prev;
                });
            }
        } else {
            setInputs(getValue(value, type));
        }
    };

    return [
        inputs,
        handleInputsChange,
        setInputs,
        { extras, validate, initialInputs },
    ];
};
