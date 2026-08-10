import {
  FiUsers,
  FiShield,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiCalendar
} from "react-icons/fi";



export default function UserStats({
users
}){


const total =
users.length;



const admins =
users.filter(
(user)=>
user.role==="ADMIN"
).length;



const normalUsers =
users.filter(
(user)=>
user.role==="USER"
).length;



const activeUsers =
users.filter(
(user)=>
user.status==="ACTIVE"
).length;



const blockedUsers =
users.filter(
(user)=>
user.status==="BLOCKED"
).length;





const currentMonth =
new Date().getMonth();



const newThisMonth =

users.filter((user)=>{


const date =
new Date(
user.createdAt
);


return (
date.getMonth() === currentMonth
);


}).length;







const cards=[


{
title:"Total Users",
value:total,
icon:<FiUsers/>
},



{
title:"Admins",
value:admins,
icon:<FiShield/>
},



{
title:"Students",
value:normalUsers,
icon:<FiUser/>
},



{
title:"Active",
value:activeUsers,
icon:<FiCheckCircle/>
},



{
title:"Blocked",
value:blockedUsers,
icon:<FiXCircle/>
},



{
title:"New This Month",
value:newThisMonth,
icon:<FiCalendar/>
}



];








return (


<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-6
gap-4
mb-6
">





{
cards.map((card)=>(


<div

key={card.title}

className="
bg-[var(--card-color)]
rounded-xl
p-5
flex
items-center
gap-4
border
border-gray-800
"

>


<div className="
text-blue-400
text-3xl
">

{card.icon}

</div>




<div>


<p className="
text-gray-400
text-sm
">

{card.title}

</p>



<h2 className="
text-2xl
font-bold
">

{card.value}

</h2>



</div>



</div>


))


}



</div>


);


}