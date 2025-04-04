import { Box, Modal, Typography, Button } from "@mui/material";
import React from "react";
import CustomButton from "../CustomButton";
import styles from "./styles.module.scss";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    p: 4,
    textAlign: "center"
  };

const CustomModal = ({
  open,
  handleClose,
  header,
  subHeader,
  onConfirm
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <CloseIcon /> */}
        <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.header}>
          {header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {subHeader}
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <CustomButton onClick={onConfirm} children="Yes" sx={{backgroundColor:"#fff", color: "#616161"}}/>
            <CustomButton onClick={handleClose} children="No" sx={{backgroundColor:"#fff", color: "#616161"}}/>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
