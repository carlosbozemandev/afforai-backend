const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../../models/Users");

const login = async (reqData, res) => {
  const { email, password } = reqData;
  const jwtToken =
    "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm";

  const user = await Users.findOne({ email, blocked: false });
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "user does not exist",
      data: {},
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      code: 401,
      success: false,
      message: "password is wrong",
      data: {},
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    jwtToken,
    {
      expiresIn: "2h",
    }
  );

  user.password = undefined;
  user.token = token;
  console.log(user);

  return {
    code: 200,
    success: true,
    message: "user logged successfully",
    data: { user },
  };
};

module.exports = { login };
