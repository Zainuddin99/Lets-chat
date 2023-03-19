import React from "react";
import Skeleton from "../../Reusable/Skeleton";

function RoomsSkeleton() {
    return (
        <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Skeleton
                    key={item}
                    height="276px"
                />
            ))}
        </>
    );
}

export default RoomsSkeleton;
