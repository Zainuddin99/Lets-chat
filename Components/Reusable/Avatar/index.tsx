import { CSSProperties } from "react";
import Image from "next/image";

import classes from "./avatar.module.scss";
import combineClasses from "../../../utils/combineClasses";

type Props = {
    type?: "primary" | "secondary";
    dimension?: string;
    altText?: string;
    imageUrl?: string;
    text?: string;
    style?: CSSProperties;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
};

const Avatar = ({
    type = "secondary",
    dimension = "40px",
    altText,
    children,
    className,
    imageUrl,
    onClick,
    style,
    text,
}: Props) => {
    return (
        <div
            className={combineClasses(
                classes.box,
                "grid-c",
                classes[type],
                className
            )}
            style={{ height: dimension, width: dimension, ...style }}
            onClick={onClick}
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={dimension}
                    height={dimension}
                    objectFit="cover"
                />
            ) : text ? (
                text
            ) : (
                children
            )}
        </div>
    );
};

export default Avatar;
