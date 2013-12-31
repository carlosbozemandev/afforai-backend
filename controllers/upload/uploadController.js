const errorLogger = require("../../functions/Logger");
const uploadService = require("../../services/upload/uploadService");

const file = async (req, res) => {
  try {
    const response = await uploadService.file(req.body, req.file);

    return res.status(201).json({
      code: 200,
      success: true,
      message: "uploaded successfully",
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle specific errors and set appropriate status code/message
      errorLogger("POST", 400, error, "Uploads", "1", error);
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error,
      });
    }

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", 500, error, "Uploads", "1", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error creating upload",
      error: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await uploadService.get(req.query.userId);
    return res.status(200).json({
      code: 200,
      success: true,
      message: "uploaded successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error uploading:", error);
    errorLogger("GET", 500, error, "Uploads", "1", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

const url = async (req, res) => {
  try {
    const response = await uploadService.url(req.body);

    return res.status(201).json({
      code: 200,
      success: true,
      message: "uploaded successfully",
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle specific errors and set appropriate status code/message
      errorLogger("POST", 400, error, "Uploads", "1", error);
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error,
      });
    }

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", 500, error, "Uploads", "1", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error creating upload",
      error: error,
    });
  }
};

module.exports = { file, url, get };
