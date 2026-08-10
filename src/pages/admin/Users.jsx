import {
  useEffect,
  useState
} from "react";


import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser
} from "../../services/userService";


import UserStats from "../../components/dashboard/users/UserStats";

import UsersTable from "../../components/dashboard/users/UsersTable";

import UserProfile from "../../components/dashboard/users/UserProfile";





export default function Users(){


const [users,setUsers] = useState([]);

const [filteredUsers,setFilteredUsers] = useState([]);

const [loading,setLoading] = useState(true);

const [error,setError] = useState("");

const [selectedUser,setSelectedUser] = useState(null);



const [search,setSearch] = useState("");

const [roleFilter,setRoleFilter] = useState("ALL");

const [statusFilter,setStatusFilter] = useState("ALL");






// =================================
// LOAD USERS
// =================================

const loadUsers = async()=>{


try{


setLoading(true);

setError("");



const data = await getUsers();



const usersData =

Array.isArray(data)

?

data

:

data.users || [];






const formattedUsers = usersData.map(user=>({

...user,

role:
(user.role || "USER").toUpperCase(),

status:
(user.status || "ACTIVE").toUpperCase()

}));




setUsers(formattedUsers);

setFilteredUsers(formattedUsers);



}
catch(error){


console.log(error);


setError(
"Failed to load users"
);


}
finally{


setLoading(false);


}


};






useEffect(()=>{

loadUsers();

},[]);







// =================================
// FILTER
// =================================


useEffect(()=>{


let result=[...users];



if(roleFilter !== "ALL"){

result =
result.filter(
user=>user.role===roleFilter
);

}



if(statusFilter !== "ALL"){

result =
result.filter(
user=>user.status===statusFilter
);

}



if(search.trim()){


const keyword =
search.toLowerCase();


result =
result.filter(user=>

user.name
?.toLowerCase()
.includes(keyword)

||

user.email
?.toLowerCase()
.includes(keyword)

);


}



setFilteredUsers(result);



},[
users,
search,
roleFilter,
statusFilter
]);







// =================================
// CHANGE ROLE
// =================================


const handleEdit = async(user)=>{


if(
user.email==="allymutabazi11@gmail.com"
){

alert(
"Main admin role cannot be changed"
);

return;

}




const newRole =

user.role==="ADMIN"

?

"USER"

:

"ADMIN";




try{


await updateUserRole(
user.id,
newRole
);


loadUsers();


}
catch(error){

alert(
error.response?.data?.message ||
"Role update failed"
);


}



};







// =================================
// STATUS
// =================================


const handleStatus = async(user)=>{


if(
user.email==="allymutabazi11@gmail.com"
){

alert(
"Main admin cannot be blocked"
);

return;

}



const newStatus =

user.status==="ACTIVE"

?

"BLOCKED"

:

"ACTIVE";




try{


await updateUserStatus(
user.id,
newStatus
);



loadUsers();



}
catch(error){


alert(
error.response?.data?.message ||
"Status update failed"
);


}



};







// =================================
// DELETE
// =================================


const handleDelete = async(user)=>{


if(
user.email==="allymutabazi11@gmail.com"
){

alert(
"Main admin cannot be deleted"
);

return;

}



const confirmDelete =
window.confirm(
`Delete ${user.name}?`
);



if(!confirmDelete)
return;




try{


await deleteUser(
user.id
);


loadUsers();



}
catch(error){


alert(
error.response?.data?.message ||
"Delete failed"
);


}



};







if(loading){


return (

<div
className="
p-6
"
style={{
color:"var(--text-color)"
}}
>

Loading users...

</div>

);


}







return (


<div

className="
p-6
space-y-6
"

style={{

backgroundColor:
"var(--background-color)",

color:
"var(--text-color)"

}}

>



{/* TITLE */}


<div>


<h1

className="
text-3xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}

>

Users Management

</h1>


<p

className="mt-2"

style={{

color:
"var(--muted-color)"

}}

>

Manage EduRwanda platform users

</p>


</div>







{/* STATS */}


<UserStats

users={users}

/>








{/* FILTER BOX */}



<div


className="
p-5
rounded-xl
border
shadow-md
flex
flex-col
md:flex-row
gap-4
"


style={{

backgroundColor:
"var(--card-color)",

borderColor:
"var(--muted-color)"

}}


>




<input


type="text"


placeholder="Search user..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
flex-1
p-3
rounded-lg
border
outline-none
"


style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}



/>







<select

value={roleFilter}

onChange={(e)=>
setRoleFilter(e.target.value)
}


className="
p-3
rounded-lg
border
"


style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


>


<option value="ALL">
All Roles
</option>

<option value="ADMIN">
ADMIN
</option>

<option value="USER">
USER
</option>


</select>







<select

value={statusFilter}

onChange={(e)=>
setStatusFilter(e.target.value)
}


className="
p-3
rounded-lg
border
"


style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


>


<option value="ALL">
All Status
</option>


<option value="ACTIVE">
ACTIVE
</option>


<option value="BLOCKED">
BLOCKED
</option>


</select>





</div>









{
error &&

<div

className="
bg-red-600
text-white
p-3
rounded-lg
"

>

{error}

</div>

}









{/* USERS TABLE */}



<div


className="
rounded-xl
border
shadow-md
p-5
"


style={{


backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"


}}


>


<UsersTable


users={filteredUsers}



onView={(user)=>
setSelectedUser(user)
}



onEdit={handleEdit}



onStatus={handleStatus}



onDelete={handleDelete}



/>


</div>









{
selectedUser &&


<UserProfile

user={selectedUser}


onClose={()=>
setSelectedUser(null)
}


/>


}






</div>



);


}