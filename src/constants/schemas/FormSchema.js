import * as yup from "yup";

const { string, object } = yup;

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