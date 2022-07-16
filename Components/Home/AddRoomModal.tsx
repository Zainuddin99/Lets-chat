import { ModalImplementationType } from "../../TS Types/utils.types";
import Modal from "../Modal";
import classes from './Home.module.scss'
import { Switch } from "@mui/material";
import { NewRoomInputs } from "../../TS Types/home.types";
import { useInputs } from "../../customHooks/useInputs";
import { handleError } from "../../utils/handleError";
import { addRoom } from "../../Firebase/Database/rooms";
import { notify } from "../../utils/notify";
import { SyntheticEvent, useState } from "react";
import { fetchRooms } from "./functions";

const initialInputs: NewRoomInputs = {
    name: '',
    description: '',
    privateRoom: false
}

function AddRoomModal({ close }: ModalImplementationType) {
    const [inputs, handleInputsChange] = useInputs(initialInputs)
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setDisableSubmit(true)
        try {
            await addRoom(inputs)
            notify("success", "Successfylly added room")
            fetchRooms()
            close()
        } catch (error: any) {
            handleError(error)
        }
        setDisableSubmit(false)
    }

    return <Modal close={close} className={classes.createRoomModal} label="Create new room" animate="pop-down">
        <form onSubmit={handleSubmit}>
            <input autoComplete="off" type="text" placeholder="Name *" name="name" required value={inputs.name} onChange={handleInputsChange} />
            <textarea placeholder="description *" name="description" rows={3} required value={inputs.description} onChange={handleInputsChange} />
            <div className={`flex-fs-c`}>
                <div className={`${classes.privateCheck}`}>Private room</div>
                <Switch value={inputs.privateRoom} onChange={handleInputsChange} name="privateRoom" />
            </div>
            <button type="submit" disabled={disableSubmit}>Add</button>
        </form>
    </Modal>;
}

export default AddRoomModal;
