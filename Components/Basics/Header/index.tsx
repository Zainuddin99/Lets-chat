import ProfileAvatarAndMenus from "./ProfileAvatarAndMenus";
import combineClasses from "../../../utils/combineClasses";
import Mode from "../Mode";

function Header() {
    return (
        <header className="shadow-light">
            <div className="flex-sb-c fluid">
                <h1 className="semibold">Lets chat</h1>
                <div className={combineClasses("flex-sb-c gap")}>
                    <Mode />
                    <ProfileAvatarAndMenus />
                </div>
            </div>
        </header>
    );
}

export default Header;
