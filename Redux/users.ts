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
    utils: {
        mode: "light",
    },
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
        toggleMode(state, action) {
            const modeToApply =
                action.payload.mode || state.utils.mode === "light"
                    ? "dark"
                    : "light";
            document.documentElement.setAttribute("mode", modeToApply);
            state.utils.mode = modeToApply;
        },
    },
});

// Extract the action creators object and the reducer
const { actions: userActions, reducer } = userSlice;

export { userActions };
// Export the reducer, either as a default or named export
export default reducer;
