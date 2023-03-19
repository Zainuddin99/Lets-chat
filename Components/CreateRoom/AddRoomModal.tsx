import { ChangeEvent, SyntheticEvent, useState } from "react";

import Modal from "../Reusable/Modal";
import classes from "./createRoom.module.scss";
import { useInputs } from "../../customHooks/useInputs";
import { handleError } from "../../utils/handleError";
import { addRoom, inputsLengthCriteria } from "../../Firebase/Database/rooms";
import { notify } from "../../utils/notify";
import InputHandler from "../Reusable/FormElements/InputHandler";
import Checkbox from "../Reusable/FormElements/Checkbox";
import { InitialInputData } from "../../TS Types/utils.types";

const initialInputs: InitialInputData = {
    name: {
        required: true,
        value: "",
        message: `Max name size: ${inputsLengthCriteria.name}`,
    },
    description: {
        required: true,
        value: "",
        message: `Max description size: ${inputsLengthCriteria.description}`,
    },
    privateRoom: {
        value: false,
    },
};

function AddRoomModal({ close }: { close: () => void }) {
    let [inputs, handleInputsChange, setInputs, { extras, validate }] =
        useInputs(initialInputs);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    //To add extra functionality for existing handle change
    const handleInputsChangeCopy = handleInputsChange;
    handleInputsChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (
            (name === "name" && value.length > inputsLengthCriteria.name) ||
            (name === "description" &&
                value.length >= inputsLengthCriteria.description)
        ) {
            setInputs({
                ...inputs,
                [name]: value.slice(0, inputsLengthCriteria[name]),
            });
            return;
        }
        handleInputsChangeCopy(e as any);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const isValidated = validate();
        if (!isValidated) return;
        setDisableSubmit(true);
        try {
            await addRoom(inputs);
            notify("success", "Successfylly added room");
            close();
        } catch (error: any) {
            handleError(error);
        }
        setDisableSubmit(false);
    };

    return (
        <Modal
            close={close}
            className={classes.createRoomModal}
            withoutBackdropShadow
            withoutBackdrop
            label="Create new room"
        >
            <form onSubmit={handleSubmit}>
                <InputHandler
                    className="primary"
                    placeholder={`Name`}
                    autoComplete="off"
                    type="text"
                    name="name"
                    error={extras["name"]?.isError}
                    message={extras["name"]?.message}
                    value={inputs.name}
                    onChange={handleInputsChange}
                />
                <InputHandler
                    element="textarea"
                    className="primary"
                    placeholder={`Description`}
                    name="description"
                    error={extras["description"]?.isError}
                    message={extras["description"]?.message}
                    rows={3}
                    value={inputs.description}
                    onChange={handleInputsChange}
                />
                <Checkbox
                    checked={inputs.privateRoom}
                    onChange={handleInputsChange}
                    name="privateRoom"
                    label="Private Room"
                />
                <div className="flex-fe-c">
                    <button
                        type="submit"
                        disabled={disableSubmit}
                    >
                        Create Room
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddRoomModal;
