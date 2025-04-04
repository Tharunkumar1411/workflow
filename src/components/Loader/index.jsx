import CircularProgress from "@mui/material/CircularProgress";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";

const Loader = () => {       
        
    return(
        <div className={styles.loadingContainer}>
            <CircularProgress color="inherit" sx={{color: "#EE3425"}}/>
            <Typography sx={{color: "#000"}}>Loading...</Typography>
        </div>
    )
}

export default Loader;