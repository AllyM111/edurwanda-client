import axios from "axios";



// =================================
// API INSTANCE
// =================================

const api = axios.create({

  baseURL: "/api",

  timeout: 30000,

});





// =================================
// REQUEST INTERCEPTOR
// =================================

api.interceptors.request.use(


(config)=>{


const token = localStorage.getItem("token");



if(token){


config.headers.Authorization =
`Bearer ${token}`;


}






// Only set JSON header if not uploading files

if(

!(config.data instanceof FormData)

){


config.headers["Content-Type"] =
"application/json";


}



return config;


},


(error)=>{


return Promise.reject(error);


}


);








// =================================
// RESPONSE INTERCEPTOR
// =================================


api.interceptors.response.use(



(response)=>{


return response;


},




(error)=>{



const status =
error.response?.status;






if(status === 401){



console.warn(
"Authentication expired. Please login again."
);



localStorage.removeItem(
"token"
);



localStorage.removeItem(
"user"
);



window.location.href="/login";


}







if(status === 403){


console.warn(
"You do not have permission for this action."
);


}






if(status === 404){


console.warn(
"Requested resource not found."
);


}






if(status >=500){


console.error(
"Server error. Try again later."
);


}






return Promise.reject(error);



}


);








export default api;