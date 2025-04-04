import * as yup from "yup";

const { string, object, ref } = yup;

export const LOGIN_DETAILS = {
    initialValue: {
      email: "",
      password: ""
    },
    validationSchema: object().shape({
      email: string().required("Required").email("Invalid Email").nullable(),
      password: string()
      .required("Required")
      .nullable(),
    }),
};

export const SIGNUP_DETAILS = {
  initialValue: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: object().shape({
    name: string().required("Required").nullable(),
    email: string().required("Required").email("Invalid Email").nullable(),
    password: string()
    .required("Required")
    .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_!#$%^&*()<>?/|}{~:])[A-Za-z\d@_!#$%^&*()<>?/|}{~:]{8,}$/, "Invalid Password")
    .nullable(),
    confirmPassword: string().required("Required").oneOf(
      [ref("password")],
      'Must match the "New Password" field value'
    ),
  }),
};

export const validationApiSchema = object({
  method: string().required("Method is required"),
  url: string().url("Invalid URL format").required("URL is required"),
});

export const validationEmailSchema = object({
  email: string().required("Required").email("Invalid Email").nullable(),
});

export const validationTextSchema = object({
  text: string().required("Required").nullable(),
});

