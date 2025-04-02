import React from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/Logo.png";
import OverlayImg from "../../assets/bg-overlay.png"; // Import overlay image

const Login = () => {
    return (
        <div className={styles.rootContainer}>
            <img src={OverlayImg} className={styles.overlayImage} alt="Overlay" />
            
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

            <div>
                
            </div>
        </div>
    );
};

export default Login;
