import { Box } from '@mui/material'
import { SyntheticEvent } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useInputs } from '../../customHooks/useInputs'
import { addMessage } from '../../Firebase/Database/chat'
import { RootState } from '../../Redux/store'
import { handleError } from '../../utils/handleError'
import classes from './chat.module.scss'

function InputContainer() {
    const [message, handleChange, setMessage] = useInputs('')
    const { activeRoomId } = useSelector((state: RootState) => state.chats)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (message) {
            try {
                await addMessage(activeRoomId, message)
                setMessage('')
            } catch (error: any) {
                handleError(error)
            }
        }
    }

    return (
        <Box sx={{boxShadow: 7}} className={classes.inputContainer}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={handleChange} placeholder='Enter your message here...' />
                <button type="submit"><IoMdSend /></button>
            </form>
        </Box>
    )
}

export default InputContainer