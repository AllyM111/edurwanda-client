export default function QuickActions(){


const actions=[

{
title:"Upload Book",
icon:"📚"
},

{
title:"Upload Exam",
icon:"📝"
},

{
title:"Manage Users",
icon:"👥"
},

{
title:"View Analytics",
icon:"📊"
}

];


return (

<div
className="
bg-white
rounded-2xl
border
p-6
shadow-sm
"
>


<h2
className="
text-xl
font-bold
mb-5
"
>
Quick Actions
</h2>


<div
className="
grid
grid-cols-2
md:grid-cols-4
gap-4
"
>


{
actions.map((item,index)=>(


<button
key={index}
className="
bg-blue-600
text-white
rounded-xl
p-4
hover:bg-blue-700
transition
"
>


<div className="text-3xl">
{item.icon}
</div>


<p className="mt-2">
{item.title}
</p>


</button>


))
}


</div>


</div>

);

}