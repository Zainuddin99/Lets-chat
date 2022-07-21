import { Box } from '@mui/material'
import { limit, onSnapshot, orderBy, query as firebaseQuery } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { formatMessageWithUserData } from '../../Firebase/Database/chat'
import { messagesSubCollectionRef } from '../../Firebase/Database/setup'
import { addRoomMessages, fetchRoomData, resetChatState } from '../../Redux/chat'
import { dispatch } from '../../Redux/store'
import classes from './chat.module.scss'
import InputContainer from './InputContainer'
import Messages from './Messages'
import RoomHeader from './RoomHeader'

function Chat() {
    const { query } = useRouter()

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchRoomData(query.chatId))
    }, [query.chatId])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            firebaseQuery(messagesSubCollectionRef(query.chatId as string),
                orderBy("messagedOn", "desc"), limit(10)
            ), async snapshot => {
                //@ts-ignore
                let data: any = []
                snapshot.docChanges().forEach(change => {
                    //Check if the chnaged doc is new in the page
                    //Note at initial response all will be new in this subscription
                    if (change.type === "added") {
                        data.push(formatMessageWithUserData(change.doc))
                    }
                });
                data = await Promise.all(data)
                dispatch(addRoomMessages(data))
            })

        return () => {
            unsubscribe()
            dispatch(resetChatState())
        }
    }, [])

    return (
        <Box sx={{ boxShadow: 2 }} className={classes.roomContainer}>
            <RoomHeader />
            <Messages />
            <InputContainer />
        </Box>
    )
}

export default Chat