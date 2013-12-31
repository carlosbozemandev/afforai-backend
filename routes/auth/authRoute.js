const express = require("express");
const router = express.Router();

//*controller import */
const authController = require("../../controllers/auth/authController");

//*Signin Api */
router.post("/signin", authController.login);
//*Session Verification Api*//
router.get("/verification", authController.verify, authController.verifyToken);

module.exports = router;
