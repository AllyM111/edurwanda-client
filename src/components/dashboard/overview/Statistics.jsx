import StatCard from "./StatCard";


export default function Statistics(){


return (

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
"
>


<StatCard
title="Books"
value="0"
icon="📚"
/>


<StatCard
title="Exams"
value="0"
icon="📝"
/>


<StatCard
title="Users"
value="0"
icon="👥"
/>


<StatCard
title="Downloads"
value="0"
icon="⬇️"
/>


</div>

);

}