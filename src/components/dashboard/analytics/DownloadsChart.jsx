import {

ResponsiveContainer,

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

CartesianGrid

} from "recharts";



export default function DownloadsChart({

books=[],

exams=[]

}){


const data = books.map((item,index)=>({


month:item.month,


books:item.count,


exams:
exams[index]?.count || 0



}));





return (

<div className="
bg-gray-900
rounded-xl
p-5
">


<h2 className="
text-xl
font-bold
text-white
mb-4
">

Books & Exams Uploads

</h2>




<ResponsiveContainer

width="100%"

height={300}

>


<BarChart

data={data}

>


<CartesianGrid

strokeDasharray="3 3"

/>



<XAxis

dataKey="month"

/>


<YAxis />



<Tooltip />



<Bar

dataKey="books"

fill="#2563eb"

/>


<Bar

dataKey="exams"

fill="#16a34a"

/>



</BarChart>


</ResponsiveContainer>



</div>


);


}