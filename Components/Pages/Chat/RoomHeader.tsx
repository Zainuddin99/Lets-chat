import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import classes from "./chat.module.scss";
import combineClasses from "../../../utils/combineClasses";

function RoomHeader() {
    const { name, participants, description } = useSelector(
        (state: RootState) => state.chats
    );
    return (
        <div className={combineClasses("shadow-basic", classes.roomHeader)}>
            <div className="flex-sb-c">
                <h4>{name}</h4>
                <div>
                    <p>{participants} participants</p>
                </div>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default RoomHeader;
