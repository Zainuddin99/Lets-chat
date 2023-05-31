import { useRouter } from "next/router";

import Breadcrumbs from "../../Reusable/Breadcrumbs";
import { SubHeaderPropsType as SubHeaderProps } from "../../../TS Types/subHeader.types";
import classes from "./subHeader.module.scss";
import combineClasses from "../../../utils/combineClasses";

function SubHeader({ title, breadcrunbLinks, breadcrumbType }: SubHeaderProps) {
    const { pathname } = useRouter();
    const pathsList = pathname.split("/");
    const pathsListLastItem = pathsList[pathsList.length - 1];

    title = title || pathsListLastItem;

    return (
        <div className={classes.container}>
            <div
                className={combineClasses(
                    "fluid",
                    classes.subContainer,
                    "flex-sb-c"
                )}
            >
                <h3 className="semibold">{title}</h3>
                <Breadcrumbs
                    type={breadcrumbType}
                    links={breadcrunbLinks}
                />
            </div>
        </div>
    );
}

export default SubHeader;
