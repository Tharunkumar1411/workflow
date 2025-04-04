import axios from "axios";
import { BAKEND_BASEURL } from "../constants/endpoint";

export const saveWorkflowToDB = async (payload) => {
  const response = await axios.post(`${BAKEND_BASEURL}/setWorkflowDetail`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getWorkflow = async (payload) => {
    const response = await axios.get(`${BAKEND_BASEURL}/getAllWorkflows`, payload);
  
    return response.data.data;
  };
