import {
FiUsers,
FiBook,
FiFileText,
FiShield
} from "react-icons/fi";



export default function AnalyticsCards({
totals
}){


const cards=[


{
title:"Total Users",
value:totals?.users || 0,
icon:<FiUsers/>,
color:"bg-blue-600"
},


{
title:"Admins",
value:totals?.admins || 0,
icon:<FiShield/>,
color:"bg-red-600"
},


{
title:"Books",
value:totals?.books || 0,
icon:<FiBook/>,
color:"bg-green-600"
},


{
title:"Exams",
value:totals?.exams || 0,
icon:<FiFileText/>,
color:"bg-purple-600"
}



];






return (

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


{
cards.map((card,index)=>(


<div

key={index}

className="
bg-gray-900
rounded-xl
p-6
flex
justify-between
items-center
"


>


<div>


<p className="
text-gray-400
">

{card.title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{card.value}

</h2>


</div>





<div className={`
${card.color}
p-4
rounded-xl
text-white
text-2xl
`}>

{card.icon}

</div>


</div>


))

}


</div>


);


}