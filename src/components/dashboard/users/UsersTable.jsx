import {
FiEye,
FiEdit,
FiTrash2,
FiUserCheck,
FiUserX
} from "react-icons/fi";



export default function UsersTable({

users,

onView,

onEdit,

onDelete,

onStatus

}){


if(!users || users.length===0){

return (

<div className="text-center py-10 text-gray-400">

No users found

</div>

);

}



return (

<div className="overflow-x-auto">


<table className="w-full text-left">


<thead>

<tr className="
border-b
border-gray-700
text-gray-400
">


<th className="p-4">
Name
</th>


<th className="p-4">
Email
</th>


<th className="p-4">
Role
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Last Login
</th>


<th className="p-4">
Actions
</th>


</tr>

</thead>





<tbody>


{
users.map((user)=>(


<tr

key={user.id}

className="
border-b
border-gray-800
hover:bg-gray-800
transition
"

>


<td className="p-4 font-semibold">

{user.name}

</td>





<td className="p-4 text-gray-300">

{user.email}

</td>






<td className="p-4">


<span

className={`px-3 py-1 rounded-full text-xs ${
user.role==="ADMIN"
?
"bg-red-600"
:
"bg-blue-600"
}`}

>

{user.role}

</span>


</td>







<td className="p-4">


<span

className={`px-3 py-1 rounded-full text-xs ${
user.status==="ACTIVE"
?
"bg-green-600"
:
"bg-gray-600"
}`}

>

{user.status}

</span>


</td>







<td className="p-4 text-gray-400">


{
user.lastLogin

?

new Date(
user.lastLogin
).toLocaleDateString()

:

"Never"

}


</td>






<td className="p-4">


<div className="flex gap-2">



<button

onClick={()=>onView(user)}

className="
bg-blue-600
p-2
rounded-lg
"

>

<FiEye/>

</button>







<button

onClick={()=>onEdit(user)}

className="
bg-yellow-600
p-2
rounded-lg
"

>

<FiEdit/>

</button>









<button

onClick={()=>onStatus(user)}

className={`
p-2
rounded-lg
${
user.status==="ACTIVE"
?
"bg-orange-600"
:
"bg-green-600"
}
`}

>


{
user.status==="ACTIVE"

?

<FiUserX/>

:

<FiUserCheck/>

}


</button>







<button

onClick={()=>onDelete(user)}

className="
bg-red-600
p-2
rounded-lg
"

>

<FiTrash2/>

</button>





</div>


</td>




</tr>


))

}



</tbody>


</table>


</div>


);


}