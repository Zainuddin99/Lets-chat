import { Paper, Tooltip } from "@mui/material"
import classes from './Home.module.scss'
import { RiChatPrivateLine, RiChatSmile2Line } from 'react-icons/ri'
import { joinRoom, removeRequest, requestToJoin } from '../../Firebase/Database/rooms'
import { handleError } from "../../utils/handleError"
import { notify } from "../../utils/notify"
import { useState } from "react"
import { changeJoinedState, changeRequestState } from "../../Redux/rooms"
import { dispatch } from "../../Redux/store"
import Router from "next/router"
import { Room } from "../../TS Types/home.types"

function EachRoom({ item }: { item: Room }) {
    const { name, description, createdAt, participants, privateRoom, id, alreadyRequested, joined } = item
    const [requesting, setRequesting] = useState<boolean>(false)

    const requestJoinHandler = async (type: 'join' | 'remove' | 'join-request') => {
        setRequesting(true)
        try {
            if (type === "join-request") {
                await requestToJoin(id)
                notify("success", "Successfully requested")
                dispatch(changeRequestState({ id }))
            } else if (type === "remove") {
                await removeRequest(id)
                notify("success", "Request cancelled")
                dispatch(changeRequestState({ id }))
            } else if (type === "join") {
                await joinRoom(id)
                dispatch(changeJoinedState({ id }))
                notify("success", "Joined room")
            }
        } catch (error: any) {
            handleError(error)
        }
        setRequesting(false)
    }

    const goToMessage = () => {
        Router.push({
            pathname: '/chat',
            query: { chatId: id }
        })
    }

    return (
        <Paper className={classes.room}>
            <div className={`flex-sb-c ${classes.header}`}>

                <Tooltip title={privateRoom ? 'Private room' : "Public room"}>
                    <h4>{privateRoom ? <RiChatPrivateLine style={{ color: "red" }} /> : <RiChatSmile2Line style={{ color: "green" }} />}</h4>
                </Tooltip>

                <p>{participants} Participants</p>
            </div>
            <div className={`${classes.subContainer} grid-c`}>
                <div className={classes.details}>
                    <div className={classes.name}>
                        <span>Name: </span> {name}
                    </div>
                    <div>
                        <span>Created on</span> {createdAt}
                    </div>
                    <div>
                        <span>Admin: </span> Zainuddin
                    </div>
                    <div className={classes.description}>
                        {description}
                    </div>
                </div>
                <div className="grid-c">
                    <button
                        disabled={requesting}
                        onClick={() => joined ? goToMessage() : (privateRoom ? (alreadyRequested ? requestJoinHandler("remove") : requestJoinHandler("join-request")) : requestJoinHandler("join"))}
                        className={joined ? "primary" : (privateRoom ? (alreadyRequested ? 'danger' : 'blue') : "secondary")}
                    >
                        {
                            joined ? 'Message' : (privateRoom ? (alreadyRequested ? 'Requested' : 'Request to join') : 'Join room')
                        }
                    </button>
                </div>
            </div>
        </Paper>
    )
}

export default EachRoom