import { getAllRooms } from "../../Firebase/Database/rooms";
import { addRoomsList } from "../../Redux/rooms";
import { dispatch } from "../../Redux/store";

export const fetchRooms = async () => {
    try {
        const rooms = await getAllRooms();
        dispatch(addRoomsList(rooms));
    } catch (error) {
        console.log(error);
    }
};
