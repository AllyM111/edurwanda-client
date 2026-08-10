import api from "./api";



// GET USERS

export const getUsers = async()=>{

const res =
await api.get("/users");

return res.data;

};




// UPDATE ROLE

export const updateUserRole = async(
id,
role
)=>{


const res =
await api.put(
`/users/${id}`,
{
role
}
);


return res.data;


};




// UPDATE STATUS

export const updateUserStatus = async(
id,
status
)=>{


const res =
await api.put(
`/users/status/${id}`,
{
status
}
);


return res.data;


};





// DELETE USER

export const deleteUser = async(id)=>{


const res =
await api.delete(
`/users/${id}`
);


return res.data;


};