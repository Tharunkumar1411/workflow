import { Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react"
import { LOGIN_DETAILS } from "../../constants/schemas/FormSchema";
import styles from "./styles.module.scss";
import { Formik } from "formik";
import CustomButton from "../CustomButton";
import GoogleImg from "../../assets/images/GoogleIcon.svg"
import AppleImg from "../../assets/images/AppleIcon.svg"
import FbImg from "../../assets/images/FaceBookIcon.svg"
import { useNavigate } from "react-router";
import { notifyUnderDev } from "../../helpers/Utils";
import useAuthStore from "../../store/Auth";
import { LoginAuth } from "../../helpers/auth";
import { PAGES_ROUTES } from "../../AppRoute/routes";

export default function LoginCard () {
     
    const [loading, setLoading] = useState(false);
    const navigage = useNavigate();
    const {setUserIn, setAuthDetails} = useAuthStore(state => state);

    const handleLogin = async(values) => {
        setLoading(prev => !prev);

        try {
            const userDetails = await LoginAuth(values.email, values.password);
            const {email, accessToken, displayName} = userDetails.user;
            setAuthDetails({email, accessToken, displayName});
            navigage(PAGES_ROUTES.DASHBOARD);
        } catch (error) {
            console.log("error::", error);
        } finally {
            setLoading(prev => !prev);
        }
    }

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
                                <label style={(errors?.password && touched?.password) ? {color: "#EE3425"} : {color: "#000"}}>Password</label>

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
                            </FormControl>

                            <FormControl className={styles.flexRow}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox defaultChecked sx={{
                                                '&.Mui-checked': {
                                                    color: "#EE3425",
                                                },
                                            }}
                                        />
                                    } 
                                    label="Remember Me" />
                                <Typography onClick={() => notifyUnderDev()}>Forget Password ?</Typography>
                            </FormControl>

                            <div className={styles.loginBtn} onClick={!loading ? handleSubmit : null}>
                                {loading ? <CircularProgress className={styles.circleLoader} size="30px"/> : <Typography className={styles.loginTxt}>LOG IN</Typography>}
                            </div>
                        </form>
                    )}
            </Formik>

            <Divider className={styles.orContainer}>Or</Divider>
            
            <div>
                <CustomButton onClick={() => notifyUnderDev()} children="Login with Google" icon={<img src={GoogleImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
                <CustomButton onClick={() => notifyUnderDev()} children="Login with Facebook" icon={<img src={AppleImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
                <CustomButton onClick={() => notifyUnderDev()} children="Login with Apple" icon={<img src={FbImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
            </div>
            
            <Typography className={styles.signupTxt}>New User? <span className={styles.span} onClick={() =>  setUserIn("Signup")}>SIGN IN HERE</span></Typography>
        </div>
    )
}