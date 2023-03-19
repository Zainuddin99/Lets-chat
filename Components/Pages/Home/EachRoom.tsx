import { MdDateRange } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import Router from "next/router";

import classes from "./Home.module.scss";
import {
    joinRoom,
    removeRequest,
    requestToJoin,
} from "../../../Firebase/Database/rooms";
import { handleError } from "../../../utils/handleError";
import { notify } from "../../../utils/notify";
import { dispatch } from "../../../Redux/store";
import { Room } from "../../../TS Types/home.types";
import { roomsActions } from "../../../Redux/rooms";
import combineClasses from "../../../utils/combineClasses";
import Tooltip from "../../Reusable/Tooltip";

const toolTipEnterDelay: number = 500;

function EachRoom({ item }: { item: Room }) {
    const {
        name,
        description,
        createdAt,
        participants,
        privateRoom,
        id,
        alreadyRequested,
        joined,
        adminData,
    } = item;
    const [requesting, setRequesting] = useState<boolean>(false);

    const requestJoinHandler = async (
        type: "join" | "remove" | "join-request"
    ) => {
        setRequesting(true);
        try {
            if (type === "join-request") {
                //To request joining
                await requestToJoin(id);
                notify("success", "Successfully requested");
                dispatch(roomsActions.changeRequestState({ id }));
            } else if (type === "remove") {
                await removeRequest(id);
                notify("success", "Request cancelled");
                dispatch(roomsActions.changeRequestState({ id }));
            } else if (type === "join") {
                await joinRoom(id);
                dispatch(roomsActions.changeJoinedState({ id }));
                notify("success", "Joined room");
            }
        } catch (error: any) {
            handleError(error);
        }
        setRequesting(false);
    };

    const goToMessage = () => {
        Router.push({
            pathname: "/chat",
            query: { chatId: id },
        });
    };

    return (
        <div className={combineClasses(classes.room, "shadow-basic")}>
            <div className={`flex-sb-c ${classes.header}`}>
                <div className={classes.participant}>
                    {participants} Participants
                </div>
                <div className={privateRoom ? classes.private : classes.public}>
                    {privateRoom ? "Private" : "Public"}
                </div>
            </div>
            <div className={combineClasses(classes.details, "flexcol-sb-fs")}>
                <div>
                    <Tooltip
                        title="Room creation date"
                        enterDelay={toolTipEnterDelay}
                    >
                        <p
                            className={combineClasses(
                                classes.createdAt,
                                "secondary-txt"
                            )}
                        >
                            <MdDateRange /> {createdAt}
                        </p>
                    </Tooltip>
                    <Tooltip
                        title="Room admin"
                        enterDelay={toolTipEnterDelay}
                    >
                        <p
                            className={combineClasses(
                                classes.admin,
                                "secondary-txt"
                            )}
                        >
                            <RiAdminLine />{" "}
                            {adminData
                                ? `${adminData.firstName} ${adminData.lastName}`
                                : "Unknown"}
                        </p>
                    </Tooltip>
                    <h5>{name}</h5>
                    <p className={classes.description}>{description}</p>
                </div>
                <button
                    disabled={requesting}
                    onClick={() =>
                        joined
                            ? goToMessage()
                            : privateRoom
                            ? alreadyRequested
                                ? requestJoinHandler("remove")
                                : requestJoinHandler("join-request")
                            : requestJoinHandler("join")
                    }
                    className={`${
                        joined
                            ? "primary"
                            : privateRoom
                            ? alreadyRequested
                                ? "danger"
                                : "blue"
                            : "secondary"
                    } ${classes.btn}`}
                >
                    {joined
                        ? "Message"
                        : privateRoom
                        ? alreadyRequested
                            ? "Requested"
                            : "Request to join"
                        : "Join room"}
                </button>
            </div>
        </div>
    );
}

export default EachRoom;
