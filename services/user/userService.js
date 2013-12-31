const User = require("../../models/Users");
const bcrypt = require("bcrypt");

const create = async (reqData) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(reqData.password, salt);

  const newUser = new User({
    fname: reqData.fname,
    lname: reqData.lname,
    email: reqData.email,
    password: hash,
    token: null,
    blocked: reqData.blocked,
  });

  try {
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

async function userExists(userEmail) {
  try {
    const existingUser = await User.findOne({ email: userEmail });
    return existingUser !== null;
  } catch (error) {
    console.error("Error checking user existence:", error);
    // Handle errors appropriately (e.g., throw an exception, log the error and return false)
  }
}

module.exports = { userExists,create };
