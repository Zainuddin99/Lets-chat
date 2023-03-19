import { MessageBoxProps } from "../../../TS Types/chat.types";
import combineClasses from "../../../utils/combineClasses";
import { getNameConstants } from "../../../utils/functions";
import CustomAvatar from "../../Reusable/Avatar";
import classes from "./chat.module.scss";

function MessageBox({ data }: MessageBoxProps) {
    const { text, messagedBy, loggedUser, messagedOn } = data;

    const messageTextStyle = {
        backgroundColor: loggedUser
            ? "rgb(238, 238, 238)"
            : "rgb(30, 136, 229)",
        color: loggedUser ? "#000" : "#fff",
        borderRadius: loggedUser ? "20px 20px 0 20px" : "0 20px 20px 20px",
    };

    return (
        <div className={classes.message}>
            <div className={classes.image}>
                {!loggedUser && (
                    <CustomAvatar
                        text={getNameConstants(
                            messagedBy.firstName,
                            messagedBy.lastName
                        )}
                        imageUrl={messagedBy.photoURL}
                        style={{
                            fontSize: "0.8rem",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                )}
            </div>
            <div
                className={`${classes.main} ${
                    loggedUser ? classes.loggedUser : ""
                }`}
            >
                <div className={classes.userData}>
                    <div>
                        {!loggedUser &&
                            `${messagedBy.firstName} ${messagedBy.lastName}`}
                    </div>
                    <div>{messagedOn}</div>
                </div>
                <div
                    style={messageTextStyle}
                    className={combineClasses("paper", classes.messageText)}
                >
                    {text}
                </div>
            </div>
        </div>
    );
}

export default MessageBox;
