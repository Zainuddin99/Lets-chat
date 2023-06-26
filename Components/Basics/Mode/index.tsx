import { useSelector } from "react-redux";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";

import { RootState, dispatch } from "../../../Redux/store";
import combineClasses from "../../../utils/combineClasses";
import { userActions } from "../../../Redux/users";
import classes from "./mode.module.scss";

function Mode({ className }: { className?: string }) {
    const userUtils = useSelector((state: RootState) => state.users.utils);
    const ModeIcon =
        userUtils.mode === "light" ? MdOutlineLightMode : MdOutlineNightlight;

    return (
        <button
            className={combineClasses(
                "basic mode relative",
                classes.mode,
                className
            )}
            onClick={() => dispatch(userActions.toggleMode({}))}
        >
            <ModeIcon
                size={23}
                className="absolute-center"
            />
        </button>
    );
}
export default Mode;
