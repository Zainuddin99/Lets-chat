import React from "react";
import Skeleton from "../../Reusable/Skeleton";

function RoomsSkeleton() {
    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton
                    key={item}
                    height="180px"
                />
            ))}
        </>
    );
}

export default RoomsSkeleton;
