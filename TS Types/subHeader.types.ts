export type LinkType = {
    label: String;
    type: "text" | "link";
    link?: string; // If type is text then link is not present
};

export type LinksType = LinkType[];

export type SubHeaderPropsType = {
    title?: string;
    breadcrumbType?: "general";
    breadcrunbLinks?: LinksType;
};
