import toast from "react-hot-toast";

export const notify = (message) => toast.success(message, {id: "success-toast"});
export const notifyUnderDev = () => toast.success("Under development", {id: "dev-toast"});
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
export function createData(id, name, flowName, flowId, editedOn, description, details) {
    return { id, name, flowName, flowId, editedOn, description, details, pinned: false };
}

export const transformApiData = (data) => {
    console.log("data check:", data)
    return data?.map((item, index) =>
      createData(
        String(index + 1),
        item.name,
        item.flowName ?? "Workflow Name here",
        item.flowId,
        `${item.name} | ${new Date(item.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`,
        `Workflow with ${item.nodes.length} nodes and ${item.edges.length} edges.`,
        item.edges.map((edge, idx) => ({
          time: new Date(item.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          status: idx % 2 === 0 ? "Passed" : "Failed"
        }))
      )
    );
};
  