import { fetchUserData } from "../Firebase/Database/users";
import { dispatch } from "../Redux/store";
import { userActions } from "../Redux/users";

const fetchSaveUserData = async (userId: string) => {
    try {
        const extraData = await fetchUserData(userId);
        dispatch(userActions.saveUser(extraData));
    } catch (error) {
        Promise.reject(error);
    }
};

export default fetchSaveUserData;
