export default function RecentActivity(){


const activities=[

"📚 New book uploaded",

"📝 New exam added",

"👤 New user registered",

"⬇️ Book downloaded"

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
Recent Activity
</h2>



<div className="space-y-3">


{
activities.map((item,index)=>(

<div
key={index}
className="
border-b
pb-3
text-gray-700
"
>
{item}
</div>

))
}


</div>


</div>

);

}