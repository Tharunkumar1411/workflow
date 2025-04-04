import { InputAdornment, Menu, MenuItem, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CustomButton from "../../components/CustomButton";
import SearchIcon from '@mui/icons-material/Search';
import DataTable from "../../components/DataTable";
import useAuthStore from "../../store/Auth";
import { useNavigate } from "react-router";
import { PAGES_ROUTES } from "../../AppRoute/routes";
import LogoutIcon from '@mui/icons-material/Logout';
import CustomModal from "../../components/CustomModal";
import useFlowStore from "../../store/Flow";

const Dashboard = () => {
    const [serchInput, setSearchInput] = useState("");
    const {authDetails} = useAuthStore(state => state);
    const {setAuthDetails} = useAuthStore(state => state);
    const [modalHeader, setModalHeader] = useState({header: "", subHeader: ""});
    const [modal, setModal] = useState(false);
    const {flows} = useFlowStore(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("flows", flows)
    },[flows])
    
    const handleLogout = () => {
        setModalHeader({...modalHeader, header: "Are you sure, you want to Logout ?"})
        setModal(true)
    };

    const handleOnConfirm = () => {
        setAuthDetails(null);
        navigate(PAGES_ROUTES.LOGIN);
    }

    const handleClose = () => {
        setModal(false);
    }

    return(
        <div className={styles.rootContainer}>
            <div className={styles.actionContainer} style={{marginBottom: "40px"}}>
                <Typography className={styles.header}>Workflow Builder</Typography>
                <div onClick={handleLogout} className={styles.profileContainer} style={{display:"flex", flexDirection:"row", alignItems:"center", gap:"10px"}}>
                    <span>{authDetails?.displayName}</span>
                    <LogoutIcon />
                </div>
                
            </div>

            <div className={styles.actionContainer}>
                <OutlinedInput
                    sx={{
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 1000px #fff inset",
                            backgroundColor: "transparent !important",
                        },
                    }}
                    type="text"
                    className={styles.input}
                    placeholder="Search By Workflow Name/ID"
                    name="search"
                    onInput={(e) => setSearchInput(e.target.value)}
                    inputProps={{
                        maxLength: "26",
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />

                <CustomButton onClick={() => navigate(`${PAGES_ROUTES.WORKFLOW}/123`)} children="+ Create New Process"  sx={{backgroundColor:"#000", color: "#fff", width:"fit-content", height: "32px"}}/>
            </div>
            
            <div className={styles.dataContainer}>
                <DataTable searchInput={serchInput}/>
            </div>

            <CustomModal onConfirm={handleOnConfirm} handleClose={handleClose} header={modalHeader.header} subHeader={modalHeader.subHeader} open={modal}/>
        </div>
    )
}

export default Dashboard;