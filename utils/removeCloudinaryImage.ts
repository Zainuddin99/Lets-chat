import axios from "axios";

const removeCloudinaryImage = async (imageId: string) => {
    try {
        await axios.post("/api/deleteCloudinaryImage", { imageId });
    } catch (error) {
        Promise.reject(error);
    }
};

export default removeCloudinaryImage;
