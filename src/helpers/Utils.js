import toast from "react-hot-toast";

export const notify = (message) => toast.success(message, {id: "success-toast"});
export const notifyError = (message) => toast.error(message, {id: "error-toast"});

export const DASHBOARD_ACTION_BTN_STYLE = {backgroundColor:"#fff", borderColor:"#E0E0E0", color: "#000", width:"fit-content", height: "32px"}