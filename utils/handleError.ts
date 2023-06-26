import { notify } from "./notify";

export const handleError = (err: Error, message?: string, title?: string) => {
    const errMessage = err?.message || err.toString();
    notify("danger", message || errMessage, title);
};

export const errorInstance = (message: string) => {
    const error = new Error(message);
    error.message = message;
    return error;
};
