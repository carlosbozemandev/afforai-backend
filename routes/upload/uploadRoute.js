const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname("file"));
  },
});
const upload = multer({ storage: storage });

//*UploadController Import */
const uploadController = require("../../controllers/upload/uploadController");

//*Upload Api */
router.get("/get", uploadController.get);
router.post("/file", upload.single("file"), uploadController.file);
router.post("/url", uploadController.url);

module.exports = router;
