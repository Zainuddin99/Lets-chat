import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../TS Types/redux.types";

const initialState: UserState | null = {
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    photoURL: "",
    cloudinaryImagePublicId: "",
    createdAt: "",
    updatedAt: "",
    id: "",
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        saveUser(state, action) {
            return { ...state, ...action.payload };
        },
        updateProfileImage(state, action) {
            state.photoURL = action.payload.photoURL;
            state.cloudinaryImagePublicId =
                action.payload.cloudinaryImagePublicId;
        },
    },
});

// Extract the action creators object and the reducer
const { actions: userActions, reducer } = userSlice;

export { userActions };
// Export the reducer, either as a default or named export
export default reducer;
