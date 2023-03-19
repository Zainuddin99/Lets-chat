import Image from "next/image";

import ProfileAvatarAndMenus from "./ProfileAvatarAndMenus";

function Header() {
    return (
        <header>
            <div className="flex-sb-c fluid full">
                <Image
                    src={"/main2.png"}
                    width="100"
                    alt="lets-chat"
                    height="90"
                />
                <ProfileAvatarAndMenus />
            </div>
        </header>
    );
}

export default Header;
