import { ModalImplementationType } from "../../TS Types/utils.types";
import Modal from "../Modal";
import classes from './Home.module.scss'
import { FormControlLabel, Switch, TextField } from "@mui/material";
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

    return <Modal close={close} className={classes.createRoomModal} label="Create new room" animate="fade-down">
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Name" variant="outlined" autoComplete="off" type="text" name="name" required value={inputs.name} onChange={handleInputsChange} />
            <TextField id="outlined-multiline-static" label="Description" multiline name="description" rows={3} required value={inputs.description} onChange={handleInputsChange} />
            <div className={`flex-fs-c`}>
                <FormControlLabel control={<Switch value={inputs.privateRoom} onChange={handleInputsChange} name="privateRoom" />} label="Private room" />
            </div>
            <button type="submit" disabled={disableSubmit}>Add</button>
        </form>
    </Modal>;
}

export default AddRoomModal;
