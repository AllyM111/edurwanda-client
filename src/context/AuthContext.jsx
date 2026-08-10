import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


import {
  loginUser,
  registerUser,
  logoutUser
} from "../services/authService";



const AuthContext = createContext(null);



export function AuthProvider({children}){


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);





// ============================
// RESTORE SESSION
// ============================

useEffect(()=>{


const token =
localStorage.getItem("token");


const savedUser =
localStorage.getItem("user");



if(token && savedUser){


try{


const parsedUser =
JSON.parse(savedUser);


// normalize role

const fixedUser = {

...parsedUser,

role:
parsedUser.role?.toUpperCase()

};



setUser(fixedUser);



localStorage.setItem(
"user",
JSON.stringify(fixedUser)
);



}catch(error){


console.log(
"Invalid saved user"
);



localStorage.removeItem("user");

localStorage.removeItem("token");


}


}



setLoading(false);



},[]);








// ============================
// LOGIN
// ============================

const login = async(data)=>{


const res =
await loginUser(data);



console.log(
"LOGIN RESPONSE:",
res
);



if(res.token){


localStorage.setItem(
"token",
res.token
);


}




if(res.user){



const fixedUser = {


...res.user,


role:
res.user.role?.toUpperCase()


};




localStorage.setItem(

"user",

JSON.stringify(fixedUser)

);



setUser(fixedUser);



}



return res;



};









// ============================
// REGISTER
// ============================

const register = async(data)=>{


return await registerUser(data);


};









// ============================
// LOGOUT
// ============================

const logout = ()=>{


logoutUser();



localStorage.removeItem(
"token"
);



localStorage.removeItem(
"user"
);



setUser(null);



};








return (

<AuthContext.Provider

value={{

user,

loading,

login,

register,

logout

}}

>


{children}


</AuthContext.Provider>


);



}









export function useAuth(){


return useContext(AuthContext);


}