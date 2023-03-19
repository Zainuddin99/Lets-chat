import CreateRoom from "../../CreateRoom";
import RoomsComp from "./Rooms";
import classes from "./Home.module.scss";
import combineClasses from "../../../utils/combineClasses";

function Home() {
    return (
        <div className={combineClasses("grid-c", classes.container)}>
            <CreateRoom />
            <RoomsComp />
        </div>
    );
}

export default Home;
