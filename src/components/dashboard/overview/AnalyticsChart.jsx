import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";





export default function AnalyticsChart({

  data = [],

}) {



return (


<div


className="
rounded-2xl
p-6
border
shadow-md
transition-all
duration-300
"


style={{


backgroundColor:
"var(--card-color)",


color:
"var(--text-color)",


borderColor:
"rgba(148,163,184,0.3)"


}}


>





{/* HEADER */}


<div className="mb-6">


<h2


className="
text-2xl
font-bold
"


style={{


color:
"var(--primary-color)"


}}


>

Platform Growth


</h2>





<p


className="
mt-1
text-sm
"


style={{


color:
"var(--muted-color)"


}}


>

Monthly users, books and exams statistics


</p>



</div>








{

data.length === 0 ?


<div


className="
h-[350px]
flex
items-center
justify-center
"


style={{


color:
"var(--muted-color)"


}}


>

No analytics data available


</div>



:



<ResponsiveContainer


width="100%"


height={350}


>


<LineChart


data={data}


margin={{


top:10,


right:30,


left:0,


bottom:0,


}}


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







<Legend





wrapperStyle={{


color:
"var(--text-color)"


}}


/>









<Line


type="monotone"


dataKey="users"


stroke="var(--primary-color)"


strokeWidth={4}


dot={{r:5}}


activeDot={{r:8}}


name="Users"


isAnimationActive={true}


/>









<Line


type="monotone"


dataKey="books"


stroke="#10b981"


strokeWidth={3}


dot={{r:4}}


activeDot={{r:7}}


name="Books"


isAnimationActive={true}


/>









<Line


type="monotone"


dataKey="exams"


stroke="#f59e0b"


strokeWidth={3}


dot={{r:4}}


activeDot={{r:7}}


name="Exams"


isAnimationActive={true}


/>






</LineChart>



</ResponsiveContainer>



}





</div>


);


}