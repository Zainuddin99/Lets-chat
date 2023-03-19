import { createSlice } from "@reduxjs/toolkit";
import { RoomsState } from "../TS Types/redux.types";

const initialState: RoomsState = {
    roomsList: [],
    loading: false,
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoomsList(state, action) {
            const { rooms, paginated } = action.payload;
            //Paginated flag determines data is comming from pagination because initially two time fetch happens and hence making duplicate data
            return {
                ...state,
                roomsList: [...(paginated ? state.roomsList : []), ...rooms],
            };
        },
        changeRoomsLoadingState(state, action) {
            const { payload }: { payload: boolean } = action;
            state.loading = payload;
        },
        changeRequestState(state, action) {
            const { id } = action.payload;
            const alteringItem = state.roomsList.find((item) => item.id === id);
            if (alteringItem) {
                alteringItem.alreadyRequested = !alteringItem.alreadyRequested;
            }
        },
        changeJoinedState(state, action) {
            const alteringItem = state.roomsList.find(
                (item) => item.id === action.payload.id
            );
            if (alteringItem) {
                alteringItem.joined = !alteringItem.joined;
            }
        },
    },
});

// Extract the action creators object and the reducer
const { actions: roomsActions, reducer } = roomsSlice;

export { roomsActions };
// Export the reducer, either as a default or named export
export default reducer;
