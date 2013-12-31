const jwt = require("jsonwebtoken");
const authService = require("../../services/auth/authService");

const authValidation = require("../../validations/auth/authValidation");
const errorLogger = require("../../functions/Logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Email or Password is missing: email or password",
        data: {},
      });
    }

    const validatedAuth = await authValidation.validate(req.body);
    const response = await authService.login(validatedAuth);
    if (response.code != 200) {
      return await res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }

    const option = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const token = await response.data.token;

    return res.status(response.code).cookie("token", token, option).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error logging in user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ status: "authorized", success: true });
};

const verify = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split("Split")[1];
  console.log(token);
  if (token) {
    //token recieved this condition executes
    jwt.verify(
      token,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      (err, decode) => {
        if (err) {
          return res.json({
            status: "error",
            success: false,
            message: "error-occured",
          });
        }
        req.user = {};
        req.user.id = decode.id;
        next();
      }
    );
  } else {
    res.json({
      status: "error",
      message: "token-not-verified",
      success: false,
    });
  }
};

module.exports = { login, verify, verifyToken };
