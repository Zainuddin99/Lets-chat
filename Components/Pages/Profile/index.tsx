import { useSelector } from "react-redux";

import SubHeader from "../../Basics/SubHeader";
import ProfileForm from "./ProfileForm";
import ProfilePhoto from "./ProfilePhoto";
import { RootState } from "../../../Redux/store";
import combineClasses from "../../../utils/combineClasses";
import classes from "./profile.module.scss";

function Profile() {
    const userData = useSelector((state: RootState) => state.users);

    return (
        <div>
            <SubHeader />
            <div className={combineClasses("fluid", classes.container)}>
                <ProfilePhoto userData={userData} />
                <ProfileForm userData={userData} />
            </div>
        </div>
    );
}

export default Profile;
