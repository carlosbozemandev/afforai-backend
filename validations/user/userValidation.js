const yup = require("yup");

const userSchema = yup.object().shape({
  fname: yup.string().required("First Name is required."),
  lname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
});

module.exports = userSchema;
