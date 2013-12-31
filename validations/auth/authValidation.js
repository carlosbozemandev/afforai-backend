const yup = require("yup");

const authSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email address."),
  password: yup.string(),
});

module.exports = authSchema;
