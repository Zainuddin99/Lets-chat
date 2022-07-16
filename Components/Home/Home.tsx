import { memo, useEffect } from "react"
import { fetchRooms } from "./functions"
import RoomsComp from "./Rooms"

function Home() {

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <div>
            <RoomsComp />
        </div>
    )
}

export default memo(Home)