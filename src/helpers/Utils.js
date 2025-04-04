import toast from "react-hot-toast";

export const notify = (message) => toast.success(message, {id: "success-toast"});
export const notifyError = (message) => toast.error(message, {id: "error-toast"});

export const DASHBOARD_ACTION_BTN_STYLE = {backgroundColor:"#fff", borderColor:"#E0E0E0", color: "#000", width:"fit-content", height: "32px"};

export function getCustomTimestamp() {
    const now = new Date();
  
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
    return `z${hours}:${minutes} IST - ${day}/${month}`;
}
  

export function getRandom3DigitId() {
    return Math.floor(100 + Math.random() * 900).toString();
}
  