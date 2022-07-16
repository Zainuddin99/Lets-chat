import { createSlice } from "@reduxjs/toolkit";
import { RoomsState } from "../TS Types/redux.types";

const initialState: RoomsState = {
    roomsList: [],
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoomsList(state, action) {
            state.roomsList = action.payload;
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
const { actions, reducer } = roomsSlice;
// Extract and export each action creator by name
export const { addRoomsList, changeRequestState, changeJoinedState } = actions;
// Export the reducer, either as a default or named export
export default reducer;
