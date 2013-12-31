const express = require("express");
const router = express.Router();

//*UserController Import */
const userController = require("../../controllers/user/userController");

//*User Signup Api */
router.post("/create", userController.create);

module.exports = router;
