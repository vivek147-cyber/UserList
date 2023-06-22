import axios from "axios";

const API_URL="http://127.0.0.1:3001/users";

export const adduser = async (data)=>{
     try {
        return await axios.post(API_URL,data);
     } catch (error) {
        return("error while calling the api",error.message);
     }
}

export const getuser = async ()=>{
    try {
       return await axios.get(API_URL);
    } catch (error) {
       return("error while calling the api",error.message);
    }
}

export const getupdateuser = async (data)=>{
    try {
       return await axios.get(`${API_URL}/${data}`);
    } catch (error) {
       return("error while calling the api",error.message);
    }
}

export const updateuser = async (data,id)=>{
    try {
       return await axios.put(`${API_URL}/${id}`,data);
    } catch (error) {
       return("error while calling the api",error.message);
    }
}


export const deleteuser = async (id)=>{
    try {
       return await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
       return("error while calling the api",error.message);
    }
}