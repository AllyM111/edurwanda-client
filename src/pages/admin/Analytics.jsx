import {
  useEffect,
  useState
} from "react";


import {
  getAnalytics
} from "../../services/analyticsService";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";





export default function Analytics(){



const [
analytics,
setAnalytics
] = useState(null);



const [
loading,
setLoading
] = useState(true);







// ===============================
// LOAD ANALYTICS
// ===============================


useEffect(()=>{


const loadAnalytics = async()=>{


try{


const data =
await getAnalytics();


console.log(
"ANALYTICS:",
data
);


setAnalytics(data);



}
catch(error){


console.log(
"ANALYTICS ERROR:",
error
);


}
finally{


setLoading(false);


}



};



loadAnalytics();



},[]);









if(loading){


return (

<div

className="p-6"

style={{

color:
"var(--text-color)"

}}

>

Loading analytics...

</div>


);


}









if(!analytics){


return (

<div

className="p-6"

style={{

color:
"var(--text-color)"

}}

>

No analytics data

</div>


);


}









return (


<div

className="
p-6
space-y-8
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

Analytics

</h1>


<p

className="
mt-2
"

style={{

color:
"var(--muted-color)"

}}

>

EduRwanda platform statistics overview

</p>


</div>









{/* =====================
    SUMMARY CARDS
===================== */}



<div

className="
grid
grid-cols-1
md:grid-cols-4
gap-5
"

>






{

[

{
title:"Users",
value:analytics.totals.users
},

{
title:"Books",
value:analytics.totals.books
},

{
title:"Exams",
value:analytics.totals.exams
},

{
title:"Downloads",
value:analytics.totals.downloads
}


].map((item)=>(


<div

key={item.title}

className="
p-6
rounded-xl
border
shadow-md
transition
"

style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}

>


<p

style={{

color:
"var(--muted-color)"

}}

>

{item.title}

</p>




<h2

className="
text-4xl
font-bold
mt-3
"

style={{

color:
"var(--primary-color)"

}}

>

{item.value || 0}

</h2>



</div>



))


}




</div>









{/* =====================
    LINE CHART
===================== */}



<div


className="
p-6
rounded-xl
border
shadow-md
"


style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}


>


<h2

className="
text-xl
font-bold
mb-6
"

>

Growth Analytics

</h2>







<div

className="
h-[350px]
w-full
"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={
analytics.chartData || []
}

>


<CartesianGrid

strokeDasharray="3 3"

opacity={0.2}

/>






<XAxis

dataKey="month"

tick={{

fill:
"var(--text-color)"

}}

/>






<YAxis

tick={{

fill:
"var(--text-color)"

}}

/>







<Tooltip


contentStyle={{


backgroundColor:
"var(--card-color)",


border:
"1px solid var(--muted-color)",


borderRadius:
"12px",


color:
"var(--text-color)"


}}


/>







<Legend />








<Line

type="monotone"

dataKey="users"

stroke="var(--primary-color)"

strokeWidth={4}

/>






<Line

type="monotone"

dataKey="books"

stroke="#10b981"

strokeWidth={3}

/>






<Line

type="monotone"

dataKey="exams"

stroke="#f59e0b"

strokeWidth={3}

/>






</LineChart>


</ResponsiveContainer>


</div>



</div>









{/* =====================
    BAR CHART
===================== */}





<div


className="
p-6
rounded-xl
border
shadow-md
"


style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}


>


<h2

className="
text-xl
font-bold
mb-6
"

>

Content Overview

</h2>








<div

className="
h-[350px]
"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={
analytics.chartData || []
}

>




<CartesianGrid

strokeDasharray="3 3"

opacity={0.2}

/>







<XAxis

dataKey="month"

tick={{

fill:
"var(--text-color)"

}}

/>







<YAxis

tick={{

fill:
"var(--text-color)"

}}

/>







<Tooltip


contentStyle={{


backgroundColor:
"var(--card-color)",


border:
"1px solid var(--muted-color)",


borderRadius:
"12px",


color:
"var(--text-color)"


}}


/>







<Legend />







<Bar

dataKey="books"

fill="#10b981"

/>







<Bar

dataKey="exams"

fill="#f59e0b"

/>






</BarChart>


</ResponsiveContainer>


</div>





</div>









</div>


);


}