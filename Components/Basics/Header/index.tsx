import ProfileAvatarAndMenus from "./ProfileAvatarAndMenus";

function Header() {
    return (
        <header className="shadow-light">
            <div className="flex-sb-c fluid full">
                <h1 className="semibold">Lets chat</h1>
                <ProfileAvatarAndMenus />
            </div>
        </header>
    );
}

export default Header;
