import { Fab, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useModalState } from '../../customHooks/useModal'
import { RootState } from '../../Redux/store'
import classes from './Home.module.scss'
import AddRoomModal from './AddRoomModal'
import EachRoom from './EachRoom'
import AddIcon from '@mui/icons-material/Add';
import { Room } from '../../TS Types/home.types'

function Rooms() {
    const [isModalOpen, openModal, closeModal] = useModalState(false)
    const { roomsList } = useSelector((state: RootState) => state.rooms)

    return (
        <>
            {isModalOpen && <AddRoomModal close={closeModal} />}
            <Paper className={classes.rooms + " " + "flex-se-c"} elevation={4} style={{ backgroundColor: "rgb(251, 251, 251)" }}>

                <div className={"grid-c" + " " + classes.createRoom}>
                    <Fab color='primary' variant="extended" className={classes.createBtn} onClick={openModal}>
                        <AddIcon />
                        Create room
                    </Fab>
                </div>

                {
                    roomsList.map((item: Room) => {
                        return <EachRoom item={item} key={item.id} />
                    })
                }

            </Paper>
        </>
    )
}

export default Rooms