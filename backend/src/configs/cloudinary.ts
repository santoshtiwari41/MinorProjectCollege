import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import constants from "./constants";

// Configuring Cloudinary
cloudinary.config({
  cloud_name: constants.cloud_name,
  api_key: constants.api_key,
  api_secret: constants.api_secret,
});

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const uploadOnCloudinary = async (base64String: string, filename: string) => {
  try {
    if (!base64String) {
      throw new Error("Base64 string is missing.");
    }

    const tempFilePath = path.join(__dirname, filename);

    // Decode base64 string and write to a temporary file
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    await writeFile(tempFilePath, buffer);

    // Upload the temporary file to Cloudinary
    const response = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "image",
      folder: "hc-notifications",
    });

    // Delete the temporary file
    await unlink(tempFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

const destroyOnCloudinary = async (remotePath: string) => {
  try {
    if (!remotePath) {
      throw new Error("Remote path is missing.");
    }

    // Extract the public_id from the remotePath
    const regex = /[\w\.\$]+(?=.png|.jpg|.gif)/;
    const matches = regex.exec(remotePath);

    if (matches) {
      const public_id = matches[0]; // This is the ID used by Cloudinary to identify the file
      const result = await cloudinary.uploader.destroy(public_id);
      console.log("File deleted on Cloudinary:", result);
      return result;
    } else {
      throw new Error("File path does not match expected format.");
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

export { uploadOnCloudinary, destroyOnCloudinary };
