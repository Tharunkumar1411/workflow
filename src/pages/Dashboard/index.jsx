import { InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import CustomButton from "../../components/CustomButton";
import SearchIcon from '@mui/icons-material/Search';
import DataTable from "../../components/DataTable";

const Dashboard = () => {
    return(
        <div className={styles.rootContainer}>
            <Typography className={styles.header}>Workflow Builder</Typography>

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
                    placeholder="Search by workflow Name/ID..."
                    name="search"
                    inputProps={{
                        maxLength: "26",
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />

                <CustomButton children="+ Create New Process"  sx={{backgroundColor:"#000", color: "#fff", width:"fit-content", height: "32px"}}/>
            </div>
            
            <div className={styles.dataContainer}>
                <DataTable />
            </div>
        </div>
    )
}

export default Dashboard;