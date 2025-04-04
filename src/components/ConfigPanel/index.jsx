import React from "react";
import ApiModal from "../ConfigModal/ApiModal";
import TextboxModal from "../ConfigModal/TextboxModal";
import EmailModal from "../ConfigModal/EmailModal";

const ConfigPanel = ({ node, onClose }) => {
    console.log("nnode", node)
    const getResprctiveModal = () => {
        switch (node.label) {
            case "API Call":
                return <ApiModal onClose={onClose}/>
            case "Text Box":
                return <TextboxModal onClose={onClose}/>;
            case "Email":
                return <EmailModal onClose={onClose}/>;
            default:
                break;
        }
    }
    
    return getResprctiveModal();
};

export default ConfigPanel;
