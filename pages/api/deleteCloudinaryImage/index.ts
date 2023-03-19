const cloudinary = require("cloudinary");
import { NextApiRequest, NextApiResponse } from "next";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            await cloudinary.v2.uploader.destroy(req.body.imageId);
            res.status(200).json({ message: "Successfully deleted image" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
