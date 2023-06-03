import { useSelector } from "react-redux";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";

import ProfileAvatarAndMenus from "./ProfileAvatarAndMenus";
import { RootState, dispatch } from "../../../Redux/store";
import combineClasses from "../../../utils/combineClasses";
import { userActions } from "../../../Redux/users";

function Header() {
    const userUtils = useSelector((state: RootState) => state.users.utils);
    const ModeIcon =
        userUtils.mode === "light" ? MdOutlineNightlight : MdOutlineLightMode;

    return (
        <header className="shadow-light">
            <div className="flex-sb-c fluid full">
                <h1 className="semibold">Lets chat</h1>
                <div className={combineClasses("flex-sb-c gap")}>
                    <button
                        className={combineClasses("basic mode relative")}
                        onClick={() => dispatch(userActions.toggleMode({}))}
                    >
                        <ModeIcon
                            size={23}
                            className="absolute-center"
                        />
                    </button>
                    <ProfileAvatarAndMenus />
                </div>
            </div>
        </header>
    );
}

export default Header;
