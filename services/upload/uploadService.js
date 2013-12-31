const fs = require("fs-extra");

const { uploadImage } = require("../../driver/ImageKit");
const Uploads = require("../../models/Uploads");
const errorLogger = require("../../functions/Logger");

const get = async (reqData) => {
  const userId = reqData?.trim()?.replace(/^"|"$/g, "");
  try {
    const allUploads = await Uploads.find({ userId: userId }).exec();

    if (allUploads) {
      return {
        code: 200,
        success: true,
        message: "uploaded successfully",
        data: allUploads,
      };
    } else {
      // No upload found for this ID
      return {
        code: 404,
        success: false,
        message: "No upload found for this user ID",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error uploading:", error);
    errorLogger("GET", 500, error, "Uploads", "1", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const file = async (reqData, reqFile) => {
  try {
    if (reqData && reqFile) {
      const filePath = reqFile.path;
      const fileBuffer = await fs.readFile(filePath);
      const fileBase64 = await fileBuffer.toString("base64");
      const uploadedFileUrl = await uploadImage(
        fileBase64,
        `${reqData.type}`,
        "payments"
      );

      if (uploadedFileUrl) {
        await fs.unlink(filePath); // Delete the temporary file
      }

      if (!uploadedFileUrl) {
        return res.status(301).json({
          code: 301,
          success: false,
          message: "Failed to upload image",
          data: null,
        });
      }

      const newUpload = await Uploads.create({
        ...reqData,
        name: reqFile.originalname,
        type: reqData.type,
        url: uploadedFileUrl,
      });

      if (newUpload) {
        return {
          code: 200,
          success: true,
          message: "uploaded successfully",
          data: newUpload,
        };
      } else {
        return {
          code: 301,
          success: false,
          message: "Failed to upload",
          data: null,
        };
      }
    }

    if (!reqData) {
      return {
        code: 500,
        success: false,
        message: "Failed to upload image to ImageKit",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error uploading:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const url = async (reqData) => {
  try {
    if (reqData) {
      const newUpload = await Uploads.create({
        ...reqData,
        name: reqData.url,
        type: reqData.type,
        url: reqData.url,
      });

      if (newUpload) {
        return {
          code: 200,
          success: true,
          message: "uploaded successfully",
          data: newUpload,
        };
      } else {
        return {
          code: 301,
          success: false,
          message: "Failed to upload",
          data: null,
        };
      }
    }

    if (!reqData) {
      return {
        code: 500,
        success: false,
        message: "Failed to upload image to ImageKit",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error uploading:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

module.exports = { file, url, get };
