import React from "react";
import { Formik, Form } from "formik";
import {
    Box,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import styles from "../../ConfigPanel/styles.module.scss";
import { validationEmailSchema } from "../../../constants/schemas/FormSchema";
import CustomButton from "../../CustomButton";

const EmailModal = ({ onClose }) => {
    return (
        <Box className={styles.configPanel}>
            <Formik
                initialValues={{ method: "", url: "", headers: "", body: "" }}
                validationSchema={validationEmailSchema}
                onSubmit={() => {
                    onClose();
                }}
            >
                {({ errors, touched, handleChange, handleBlur, values }) => (
                    <Form className={styles.form}>
                       
                        {/* Headers Input */}
                         <FormControl>
                            <label style={(errors?.email && touched?.email) ? {color: "#EE3425"} : {color: "#000"}}>Email</label>

                            <OutlinedInput
                                sx={{
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow: "0 0 0 1000px #fff inset",
                                        backgroundColor: "transparent !important",
                                    },
                                }}  
                                type="email"
                                className={styles.input}
                                placeholder="type here..."
                                value={values.email}
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors?.email && touched?.email}
                                inputProps={{
                                    maxLength: "26",
                                }}
                                fullWidth
                            />
                        </FormControl>

                        {/* Submit Button */}
                        <CustomButton children="submit" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>
                        <CustomButton onClick={onClose} children="close" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EmailModal;
