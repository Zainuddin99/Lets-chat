import { IoMdAdd } from "react-icons/io";

import classes from "./createRoom.module.scss";
import AddRoomModal from "./AddRoomModal";
import RoundedPulseBtn from "../Reusable/Buttons/RoundedPulseBtn";
import { useModalState } from "../../customHooks/useModal";

function CreateRoom() {
    const [isModalOpen, openModal, closeModal] = useModalState(false);

    return (
        <>
            {isModalOpen && <AddRoomModal close={closeModal} />}
            <div className={classes.createRoom}>
                <RoundedPulseBtn
                    content={
                        <>
                            <IoMdAdd size={30} />
                            New Room
                        </>
                    }
                    className={classes.createBtn}
                    onClick={isModalOpen ? closeModal : openModal}
                />
            </div>
        </>
    );
}

export default CreateRoom;
