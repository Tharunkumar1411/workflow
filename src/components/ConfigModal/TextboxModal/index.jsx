import React from "react";
import { Formik, Form } from "formik";
import {
    Box,
    FormControl,
    TextField,
} from "@mui/material";
import styles from "../../ConfigPanel/styles.module.scss";
import CustomButton from "../../CustomButton";
import { validationTextSchema } from "../../../constants/schemas/FormSchema";

const TextboxModal = ({ onClose }) => {
    return (
        <Box className={styles.configPanel}>
            <Formik
                initialValues={{ method: "", url: "", headers: "", body: "" }}
                validationSchema={validationTextSchema}
                onSubmit={() => {
                    onClose();
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form className={styles.form}>
                        <FormControl>
                            <label style={(errors?.email && touched?.email) ? {color: "#EE3425"} : {color: "#000"}}>Enter Description</label>
                            <TextField
                                name="body"
                                multiline
                                rows={3}
                                placeholder="Enter Body (optional)"
                                className={styles.input}
                                value={values.body}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <CustomButton children="submit" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>
                        <CustomButton onClick={onClose} children="close" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default TextboxModal;
