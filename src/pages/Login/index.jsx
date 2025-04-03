import React from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/images/Logo.png";
import OverlayImg from "../../assets/images/bg-overlay.png";
import { useMediaQuery, useTheme } from "@mui/material";
import LoginCard from "../../components/LoginCard";
import useAuthStore from "../../store/Auth";
import SignupCard from "../../components/SignupCard";

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {userIn} = useAuthStore(state => state)

    return (
        <div className={styles.rootContainer}>
            <img src={OverlayImg} className={styles.overlayImage} alt="Overlay" />
            
            {!isMobile &&
                <div className={styles.contentRootContainer}>
                    
                    <div className={styles.contentContainer}>
                        <img src={Logo} className={styles.logo} width="64px" height="64px" />
                        <h1>HighBridge</h1>
                    </div>

                    <div className={styles.futureContainer}>
                        <h1>Building the Future</h1>
                        <p style={{width: "380px"}} className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                </div>
            }
            
            {userIn === "Login" ? <LoginCard /> : <SignupCard />}
        </div>
    );
};

export default Login;
