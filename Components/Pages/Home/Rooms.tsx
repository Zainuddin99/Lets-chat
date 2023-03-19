import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { dispatch, RootState } from "../../../Redux/store";
import classes from "./Home.module.scss";
import EachRoom from "./EachRoom";
import { Room } from "../../../TS Types/home.types";
import { QueryDocumentSnapshotType } from "../../../TS Types/firebase.types";
import { roomsActions } from "../../../Redux/rooms";
import { AllRoomsResponse } from "../../../Firebase/Database/rooms.types";
import { getAllRooms } from "../../../Firebase/Database/rooms";
import RoomsSkeleton from "./RoomsSkeleton";
import { inRange } from "../../../utils/functions";
import { handleError } from "../../../utils/handleError";
import combineClasses from "../../../utils/combineClasses";

function Rooms() {
    //Storing in ref because the data needs to be updated at event listner which can be done using refs
    const paginationDataRef = useRef<{
        lastDocumentSnap: QueryDocumentSnapshotType | null;
        noMoreRooms: boolean;
    } | null>(null);
    const { roomsList, loading } = useSelector(
        (state: RootState) => state.rooms
    );

    const mainDiv = useRef<HTMLDivElement>(null);

    const fetchRooms = async (
        //At first it will be null
        lastDocumentSnapData: QueryDocumentSnapshotType | null
    ) => {
        try {
            dispatch(roomsActions.changeRoomsLoadingState(true));
            const { rooms, noMoreRooms, lastDocumentSnap }: AllRoomsResponse =
                await getAllRooms(lastDocumentSnapData);
            paginationDataRef.current = { lastDocumentSnap, noMoreRooms };
            dispatch(
                roomsActions.addRoomsList({
                    rooms,
                    paginated: lastDocumentSnapData ? true : false,
                })
            );
            dispatch(roomsActions.changeRoomsLoadingState(false));
        } catch (error: any) {
            handleError(error);
        }
    };

    useEffect(() => {
        if (roomsList.length === 0) {
            fetchRooms(null);
        }
    }, []);

    useEffect(() => {
        //Ref might change later (to remove warning) store in local var to maintain its identity
        const divRef = mainDiv.current;

        const handleSroll = function (event: any) {
            if (paginationDataRef.current?.noMoreRooms) {
                return () => divRef?.removeEventListener("scroll", handleSroll);
            }
            let element = event.target as HTMLDivElement;
            //Because there can be some difference
            const scrollValue = element.scrollHeight - element.scrollTop;
            if (
                element &&
                inRange(
                    scrollValue,
                    element.clientHeight - 4,
                    element.clientHeight + 100
                )
            ) {
                fetchRooms(paginationDataRef.current?.lastDocumentSnap || null);
            }
        };

        divRef?.addEventListener("scroll", handleSroll);
        return () => divRef?.removeEventListener("scroll", handleSroll);
    }, []);

    return (
        <>
            <div
                ref={mainDiv}
                className={combineClasses(
                    "flex-se-c fluid shadow-basic",
                    classes.rooms
                )}
            >
                {roomsList.map((item: Room) => {
                    return (
                        <EachRoom
                            item={item}
                            key={item.id}
                        />
                    );
                })}

                {loading && <RoomsSkeleton />}
            </div>
        </>
    );
}

export default Rooms;
