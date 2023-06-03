import { useSelector } from "react-redux";

import Avatar from "../../Reusable/Avatar";
import { getNameConstants } from "../../../utils/functions";
import { RootState } from "../../../Redux/store";
import Menu from "../../Reusable/Menu";
import { profileMenuAvatarItems } from "./constants";

function ProfileAvatarAndMenus() {
    const { photoURL, firstName, lastName } = useSelector(
        (state: RootState) => state.users
    );

    return (
        <Menu items={profileMenuAvatarItems}>
            <Avatar
                text={getNameConstants(firstName, lastName)}
                imageUrl={photoURL}
            />
        </Menu>
    );
}

export default ProfileAvatarAndMenus;
