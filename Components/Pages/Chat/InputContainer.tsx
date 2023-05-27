import { SyntheticEvent, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

import { useInputs } from "../../../customHooks/useInputs";
import { addMessage } from "../../../Firebase/Database/chat";
import { RootState } from "../../../Redux/store";
import { handleError } from "../../../utils/handleError";
import classes from "./chat.module.scss";
import combineClasses from "../../../utils/combineClasses";

function InputContainer() {
    const [message, handleChange, setMessage] = useInputs("");
    const { activeRoomId } = useSelector((state: RootState) => state.chats);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        inputRef.current?.focus();
        setMessage("");
        if (message) {
            try {
                await addMessage(activeRoomId, message);
            } catch (error: any) {
                handleError(error);
            }
        }
    };

    return (
        <div className={combineClasses("shadow", classes.inputContainer)}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    ref={inputRef}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                />
                <button
                    type="submit"
                    className="full"
                >
                    <IoMdSend />
                </button>
            </form>
        </div>
    );
}

export default InputContainer;
