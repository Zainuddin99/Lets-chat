import { useState } from "react";
import axios from "axios";
import Compressor from "compressorjs";
import {
    AiFillCamera,
    AiOutlineClose,
    AiOutlineUpload,
    AiFillDelete,
} from "react-icons/ai";

import CustomAvatar from "../../Reusable/Avatar";
import classes from "./profile.module.scss";
import { handleError } from "../../../utils/handleError";
import {
    removeProfileImage,
    updateProfileImage,
} from "../../../Firebase/Database/users";
import { UserState } from "../../../TS Types/redux.types";
import { userActions } from "../../../Redux/users";
import { dispatch } from "../../../Redux/store";
import removeCloudinaryImage from "../../../utils/removeCloudinaryImage";
import { getNameConstants } from "../../../utils/functions";
import Tooltip from "../../Reusable/Tooltip";

type Props = {
    userData: UserState;
};
const ICON_SIZE = 20;

function ProfilePhoto({ userData }: Props) {
    const { photoURL, cloudinaryImagePublicId, firstName, lastName } = userData;

    const [profileImage, setProfileImage] = useState<string>(photoURL);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [progress, setProgress] = useState(-1);

    const handleImageSelection = (e: any) => {
        new Compressor(e.target.files[0], {
            quality: 0.6,
            success: (compressedResult: any) => {
                setSelectedFile(compressedResult);
            },
        });
        const src = URL.createObjectURL(e.target.files[0]);
        setImagePreview(src);
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setImagePreview("");
    };

    const uploadImage = async () => {
        const formData: any = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", process.env.CLOUDINARY_PRESET_NAME);
        try {
            if (cloudinaryImagePublicId) {
                await removeCloudinaryImage(cloudinaryImagePublicId);
            }
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
                formData,
                {
                    onUploadProgress: (event) => {
                        setProgress(
                            // @ts-ignore
                            Math.round((event.loaded * 100) / event.total)
                        );
                    },
                }
            );
            const { secure_url, public_id } = response.data;
            await updateProfileImage(secure_url, public_id);
            dispatch(
                userActions.updateProfileImage({
                    photoURL: secure_url,
                    cloudinaryImagePublicId: public_id,
                })
            );
            setProfileImage(secure_url);
            setSelectedFile(null);
            setImagePreview("");
        } catch (error: any) {
            handleError(error);
        }
        setProgress(-1);
    };

    const handleRemoveImage = async () => {
        try {
            await removeProfileImage();
            setProfileImage("");
            dispatch(
                userActions.updateProfileImage({
                    photoURL: "",
                    cloudinaryImagePublicId: "",
                })
            );
        } catch (error: any) {
            handleError(error);
        }
    };

    const avatarUrl = imagePreview || profileImage || "";

    return (
        <div>
            <div className={classes.profilePhoto}>
                <CustomAvatar
                    imageUrl={avatarUrl}
                    altText={"profile avatar"}
                    text={getNameConstants(firstName, lastName)}
                    dimension="80px"
                    style={{ fontSize: "2rem" }}
                />
                <label className={classes.imageSelect}>
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageSelection}
                    />
                    <AiFillCamera size={ICON_SIZE} />
                </label>
            </div>
            {progress > -1 ? (
                // <LinearProgress
                //     style={{ marginTop: "20px" }}
                //     variant="determinate"
                //     value={progress}
                // />
                <></>
            ) : (
                <div className="flex-c-c">
                    {selectedFile ? (
                        <>
                            <Tooltip title="Cancel">
                                <label onClick={cancelUpload}>
                                    <AiOutlineClose size={ICON_SIZE} />
                                </label>
                            </Tooltip>
                            <Tooltip title="Upload">
                                <label onClick={uploadImage}>
                                    <AiOutlineUpload
                                        size={ICON_SIZE}
                                        className={classes.uploadIcon}
                                    />
                                </label>
                            </Tooltip>
                        </>
                    ) : profileImage ? (
                        <Tooltip title="Remove profile photo">
                            <label onClick={handleRemoveImage}>
                                <AiFillDelete size={ICON_SIZE} />
                            </label>
                        </Tooltip>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default ProfilePhoto;
