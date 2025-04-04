import React from "react";
import { Formik, Form } from "formik";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    FormHelperText,
    TextField,
} from "@mui/material";
import styles from "../../ConfigPanel/styles.module.scss";
import CustomButton from "../../CustomButton";
import { validationApiSchema } from "../../../constants/schemas/FormSchema";

const ApiModal = ({ onClose }) => {
    return (
        <Box className={styles.configPanel}>
            <Formik
                initialValues={{ method: "", url: "", headers: "", body: "" }}
                validationSchema={validationApiSchema}
                onSubmit={(values) => {
                    console.log("Submitted Data:", values);
                    onClose();
                }}
            >
                {({ errors, touched, handleChange, handleBlur, values }) => (
                    <Form className={styles.form}>
                        <FormControl fullWidth className={styles.input} error={touched.method && Boolean(errors.method)}>
                            <InputLabel>Method</InputLabel>
                            <Select
                                name="method"
                                value={values.method}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem value="GET">GET</MenuItem>
                                <MenuItem value="POST">POST</MenuItem>
                                <MenuItem value="PUT">PUT</MenuItem>
                                <MenuItem value="DELETE">DELETE</MenuItem>
                            </Select>
                            {touched.method && errors.method && <FormHelperText>{errors.method}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth className={styles.input} error={touched.url && Boolean(errors.url)}>
                            <OutlinedInput
                                name="url"
                                placeholder="Enter URL..."
                                value={values.url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.url && errors.url && <FormHelperText>{errors.url}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth className={styles.input}>
                            <OutlinedInput
                                name="headers"
                                placeholder="Enter Headers (optional)"
                                value={values.headers}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <TextField
                            name="body"
                            multiline
                            rows={3}
                            placeholder="Enter Body (optional)"
                            className={styles.input}
                            value={values.body}
                            onChange={handleChange}
                        />

                        <CustomButton children="submit" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>
                        <CustomButton onClick={onClose} children="close" sx={{backgroundColor:"#fff", width: "100%", color: "#616161"}}/>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default ApiModal;
