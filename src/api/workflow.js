import axios from "axios";
import { BAKEND_BASEURL, localport } from "../constants/endpoint";

export const saveWorkflowToDB = async (payload) => {
  const response = await axios.post(`${localport}/setWorkflowDetail`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getWorkflow = async (payload) => {
    const response = await axios.get(`${localport}/getAllWorkflows`, payload);
  
    return response.data.data;
  };
