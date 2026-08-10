import api from "./api";



// =================================
// GET PROFILE
// =================================

export const getProfile = async()=>{


const response = await api.get(
"/profile"
);


return response.data;


};





// =================================
// UPDATE PROFILE
// =================================

export const updateProfile = async(data)=>{


const response = await api.put(

"/profile",

data

);


return response.data;


};







// =================================
// CHANGE PASSWORD
// =================================

export const changePassword = async(data)=>{


const response = await api.put(

"/profile/password",

data

);


return response.data;


};