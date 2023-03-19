import { useRouter } from "next/router";
import Link from "next/link";

import { LinksType, LinkType } from "../../../TS Types/subHeader.types";
import combineClasses from "../../../utils/combineClasses";

//Both are optional if no data given then it will apply default one
type Props = {
    type?: "general";
    links?: LinksType;
};

const homeLink: LinkType = {
    label: "Home",
    type: "link",
    link: "/",
};

function Breadcrumbs({ type = "general", links = [] }: Props) {
    const { pathname } = useRouter();
    const pathsList = pathname.split("/");
    const pathsListLastItem = pathsList[pathsList.length - 1];

    links =
        type === "general"
            ? [homeLink, { label: pathsListLastItem, type: "text" }]
            : links;

    return (
        <div
            className={combineClasses("flex-fs-c")}
            style={{ gap: "5px" }}
        >
            {links.map((item, index) => {
                const { label, type, link } = item;

                return (
                    <>
                        {type === "link" ? (
                            <Link href={link as string}>{label}</Link>
                        ) : (
                            <div>{label}</div>
                        )}
                        {links.length - 1 !== index && "/"}
                    </>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;
