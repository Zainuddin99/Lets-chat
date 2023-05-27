import {
    MdOutlineDateRange,
    MdOutlineInfo,
    MdOutlinePeopleAlt,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
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
import HoveriiButton from "../../Reusable/Buttons/HoverriButton";

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

    const details = [
        {
            title: "Room type",
            value: privateRoom ? "Private" : "Public",
            type: privateRoom ? "danger" : "primary",
        },
        {
            title: "Particapnts",
            value: participants,
            icon: MdOutlinePeopleAlt,
        },
        {
            title: "Admin",
            value: adminData.firstName,
            icon: CgProfile,
        },
        {
            title: "Created on",
            value: new Date(createdAt).toDateString(),
            icon: MdOutlineDateRange,
        },
    ];

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
        <div className={combineClasses(classes.room, "card round-lg paper")}>
            <div className={combineClasses(classes.main, "flex-sb-fs")}>
                <div className={combineClasses(classes.content, "flexcol")}>
                    <h3 className={combineClasses("semibold")}>{name}</h3>
                    <h4>{description}</h4>
                </div>

                {alreadyRequested && (
                    <div
                        className={combineClasses(
                            classes.requested,
                            "round-sm",
                            "icon-wrapper"
                        )}
                    >
                        <MdOutlineInfo /> Requested
                    </div>
                )}
            </div>

            <div className={combineClasses(classes.footer, "flexcol-fs-fs")}>
                <HoveriiButton
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
                    type={
                        joined
                            ? "primary"
                            : privateRoom
                            ? "danger"
                            : "secondary"
                    }
                >
                    {joined
                        ? "Message"
                        : privateRoom
                        ? alreadyRequested
                            ? "Cancel Request"
                            : "Request"
                        : "Join room"}
                </HoveriiButton>

                <div
                    className={combineClasses(
                        "flex secondary-text wrap",
                        classes.details
                    )}
                >
                    {details.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className={combineClasses(
                                    "outlined round-lg relative",
                                    classes.detail,
                                    item.type && classes[item.type]
                                )}
                            >
                                <div
                                    className={combineClasses(
                                        "icon-wrapper",
                                        classes.content
                                    )}
                                >
                                    {Icon && <Icon />}
                                    {item.value}
                                </div>
                                <div className={classes.title}>
                                    {item.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default EachRoom;
