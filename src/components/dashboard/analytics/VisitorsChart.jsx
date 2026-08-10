import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";



export default function AnalyticsChart({
data=[]
}){


return (

<div
className="
bg-gray-900
rounded-xl
p-6
"
>


<h2
className="
text-xl
font-bold
mb-5
"
>

Platform Growth

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart
data={data}
>


<CartesianGrid />


<XAxis
dataKey="month"
/>


<YAxis />


<Tooltip />



<Line

type="monotone"

dataKey="users"

strokeWidth={3}

/>



<Line

type="monotone"

dataKey="books"

strokeWidth={3}

/>



<Line

type="monotone"

dataKey="exams"

strokeWidth={3}

/>



</LineChart>


</ResponsiveContainer>



</div>


);


}