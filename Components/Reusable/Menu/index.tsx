import { useState } from "react";
import { useRouter } from "next/router";

import { MenusProps } from "../../../TS Types/utils.types";
import combineClasses from "../../../utils/combineClasses";
import classes from "./menu.module.scss";

function Menu({ children, items, withClosableWrapper = true }: MenusProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    const handleDropdown = () => setShowDropdown((prev) => !prev);

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        link?: string,
        click?: React.MouseEventHandler<HTMLDivElement>
    ) => {
        if (link) {
            router.push(link);
        }
        if (click) {
            click(e);
        }
        handleDropdown();
    };

    return (
        <div className={combineClasses("relative", classes.container)}>
            {withClosableWrapper && showDropdown && (
                <div
                    onClick={handleDropdown}
                    className={classes.wrapper}
                ></div>
            )}
            <div onClick={handleDropdown}>{children}</div>
            {showDropdown && (
                <div className={combineClasses(classes.menu, "shadow")}>
                    {items.map((item) => (
                        <div
                            className={combineClasses(classes.item)}
                            key={item.name}
                            onClick={(e) =>
                                handleClick(e, item.link, item.onClick)
                            }
                        >
                            {item.icon && <item.icon />}
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Menu;
