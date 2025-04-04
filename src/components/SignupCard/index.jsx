import { Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react"
import { SIGNUP_DETAILS } from "../../constants/schemas/FormSchema";
import styles from "../LoginCard/styles.module.scss";
import { Formik } from "formik";
import CustomButton from "../CustomButton";
import GoogleImg from "../../assets/images/GoogleIcon.svg"
import { SigninAuth } from "../../helpers/auth";
import { useNavigate } from "react-router";
import { notifyError, notifyUnderDev } from "../../helpers/Utils";
import useAuthStore from "../../store/Auth";
import { PAGES_ROUTES } from "../../AppRoute/routes";

export default function SignupCard () {
     
    const [loading, setLoading] = useState(false);
    const navigage = useNavigate();
    const {setUserIn, setAuthDetails} = useAuthStore(state => state);

    const handleSignin = async(values) => {
        setLoading(prev => !prev);

        try {
            const userDetails = await SigninAuth(values.email, values.password, values.name);

            const {email, accessToken, displayName} = userDetails.user;

            setAuthDetails({email, accessToken, displayName});
            navigage(PAGES_ROUTES.DASHBOARD);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            notifyError("Email already in use. Please Login!")
            setUserIn("Login")
        } finally {
            setLoading(prev => !prev)
        }
    }

    return(
        <div className={styles.loginContainer}>
            <Typography className={styles.subHeader}>WELCOME!</Typography>
            <Typography className={styles.header}>Create your Account</Typography>

            <Formik
                    initialValues={SIGNUP_DETAILS.initialValue}
                    validationSchema={SIGNUP_DETAILS.validationSchema}
                    onSubmit={handleSignin}
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
                                <label style={(errors?.name && touched?.name) ? {color: "#EE3425"} : {color: "#000"}}>Name</label>
                                <OutlinedInput
                                    sx={{
                                        "& input:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #fff inset",
                                            backgroundColor: "transparent !important",
                                        },
                                    }}  
                                    type="name"
                                    className={styles.input}
                                    placeholder="type here..."
                                    onInput={(e) => {
                                        setFieldValue("name", e.target.value);
                                    }}
                                    value={values.name}
                                    name="name"
                                    onBlur={handleBlur}
                                    error={errors?.name && touched?.name}
                                    inputProps={{
                                        maxLength: "26",
                                    }}
                                    fullWidth
                                />
                            </FormControl>

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
                            <FormHelperText>
                                Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number
                            </FormHelperText>

                            <FormControl>
                                <label style={(errors?.confirmPassword) ? {color: "#EE3425"} : {color: "#000"}}>Confirm Password</label>
                                <OutlinedInput
                                    sx={{
                                        "& input:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #fff inset",
                                            backgroundColor: "transparent !important",
                                        },
                                    }} 
                                    type="confirmPassword"
                                    className={styles.input}
                                    placeholder="type here..."
                                    onInput={(e) => {
                                        setFieldValue("confirmPassword", e.target.value);
                                    }}
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    onBlur={handleBlur}
                                    error={errors?.confirmPassword && touched?.confirmPassword}
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
                            </FormControl>

                            <div className={styles.loginBtn} onClick={!loading ? handleSubmit : null}>
                                {loading ? <CircularProgress className={styles.circleLoader} size="30px"/> : <Typography className={styles.loginTxt}>SIGN IN</Typography>}
                            </div>
                        </form>
                    )}
            </Formik>

            <Divider className={styles.orContainer}>Or</Divider>
            
            <div>
                <CustomButton onClick={() => notifyUnderDev()} children="Login with Google" icon={<img src={GoogleImg} height="18px"/>}  sx={{backgroundColor:"#fff", color: "#616161", width:"100%", marginTop:"15px", padding: "5px"}}/>
            </div>
            
            <Typography className={styles.signupTxt} onClick={() => setUserIn("Login")}>Already Have an Account? <span className={styles.span}>LOG IN HERE</span></Typography>
        </div>
    )
}