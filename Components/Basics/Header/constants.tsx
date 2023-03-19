import { ImProfile } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";

import { signoutUser } from "../../../Firebase/auth";
import { MenuItems } from "../../../TS Types/utils.types";

export const avatarSize: number = 45;

export const profileMenuAvatarItems: MenuItems = [
    {
        name: "Profile",
        icon: ImProfile,
        link: "/profile",
    },
    {
        name: "Logout",
        icon: AiOutlineLogout,
        onClick: signoutUser,
    },
];
