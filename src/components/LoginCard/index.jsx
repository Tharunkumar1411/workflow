import { Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react"
import { LOGIN_DETAILS } from "../../constants/schemas/FormSchema";
import styles from "./styles.module.scss";
import { Formik } from "formik";
import CustomButton from "../CustomButton";
import GoogleImg from "../../assets/GoogleIcon.svg"
import AppleImg from "../../assets/AppleIcon.svg"
import FbImg from "../../assets/FaceBookIcon.svg"
import { Padding } from "@mui/icons-material";

export default function LoginCard () {
    const handleLogin = () => {};
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    return(
        <div className={styles.loginContainer}>
            <Typography className={styles.subHeader}>WELCOME BACK!</Typography>
            <Typography className={styles.header}>Log In to your Account</Typography>

            <Formik
                    initialValues={LOGIN_DETAILS.initialValue}
                    validationSchema={LOGIN_DETAILS.validationSchema}
                    onSubmit={handleLogin}
                >
                    {({
                        values,
                        errors,
                        touched,
                        // handleChange,
                        handleSubmit,
                        setFieldValue,
                        handleBlur,
                    }) => (
                        <form className={styles.formWrapper}>
                            <FormControl>
                                <label>Email</label>
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
                                    onInput={(e) => {
                                        setFieldValue("email", e.target.value);
                                    }}
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    error={errors?.email && touched?.email}
                                    inputProps={{
                                        maxLength: "26",
                                    }}
                                    fullWidth
                                />
                            </FormControl>

                            <FormControl>
                                <label>Password</label>
                                <OutlinedInput
                                     sx={{
                                        "& input:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #fff inset",
                                            backgroundColor: "transparent !important",
                                        },
                                    }}  
                                    type="password"
                                    className={styles.input}
                                    placeholder="type here..."
                                    onInput={(e) => {
                                        setFieldValue("password", e.target.value);
                                    }}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    error={errors?.password && touched?.password}
                                    inputProps={{
                                        maxLength: "26",
                                    }}
                                />
                                <FormHelperText className={styles.error}>
                                    {errors?.password && touched?.password && errors?.password}
                                </FormHelperText>
                            </FormControl>

                            <FormControl className={styles.flexRow}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                                <Typography>Forget Password ?</Typography>
                            </FormControl>

                            <div className={styles.loginBtn} onClick={!loading ? handleSubmit : null}>
                                <Typography className={styles.loginTxt}>LOG IN</Typography>
                                {loading ? <CircularProgress className={styles.circleLoader}/> : null}
                            </div>
                        </form>
                    )}
            </Formik>

            <Divider className={styles.orContainer}>Or</Divider>
            
            <div>
                <CustomButton children="Login with Google" icon={<img src={GoogleImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
                <CustomButton children="Login with Facebook" icon={<img src={AppleImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
                <CustomButton children="Login with Apple" icon={<img src={FbImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
            </div>
            
            <Typography className={styles.signupTxt}>New User? <span className={styles.span}>SIGN UP HERE</span></Typography>
        </div>
    )
}