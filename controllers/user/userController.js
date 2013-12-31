const errorLogger = require("../../functions/Logger");
const userService = require("../../services/user/userService");
//**User Validation Import**/
const userValidation = require("../../validations/user/userValidation");

const create = async (req, res) => {
  try {
    let { email } = req.body;

    const validatedUser = await userValidation.validate(req.body);
    const existingUser = await userService.userExists(email);

    if (existingUser) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "User Already Exist",
        data: existingUser,
      });
    }

    const response = await userService.create(validatedUser);

    return res.status(201).json({
      code: 201,
      success: true,
      message: "User created successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error creating user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = { create };
