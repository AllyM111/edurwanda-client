import {
  FiEdit,
  FiTrash2,
  FiFileText,
  FiDownload,
} from "react-icons/fi";


export default function ExamsTable({

  exams = [],

  onEdit,

  onDelete,

}) {


return (

<div

className="
rounded-2xl
shadow-md
border
overflow-hidden
"

style={{

backgroundColor:
"var(--card-color)",

color:
"var(--text-color)"

}}

>


<table className="w-full">


<thead>

<tr

className="
border-b
"

style={{

borderColor:
"var(--muted-color)"

}}

>


<th className="text-left p-4">
Title
</th>


<th className="text-left p-4">
Level
</th>


<th className="text-left p-4">
Subject
</th>


<th className="text-left p-4">
Year
</th>


<th className="text-left p-4">
Files
</th>


<th className="text-left p-4">
Actions
</th>


</tr>

</thead>



<tbody>


{

exams.length === 0 ?


(

<tr>

<td

colSpan="6"

className="
text-center
p-10
"

style={{

color:
"var(--muted-color)"

}}

>

No exams found.

</td>

</tr>

)



:


(

exams.map((exam)=>(


<tr

key={exam.id}

className="
border-b
hover:bg-gray-50
transition
"

style={{

borderColor:
"var(--muted-color)"

}}

>



{/* TITLE */}

<td className="p-4">


<div

className="
flex
items-center
gap-3
"

>


<div

className="
w-10
h-10
rounded-lg
flex
items-center
justify-center
text-white
"

style={{

backgroundColor:
"var(--primary-color)"

}}

>

<FiFileText/>

</div>



<div>

<p className="font-semibold">

{exam.title}

</p>

</div>



</div>


</td>





{/* LEVEL */}

<td className="p-4">


<span

className="
px-3
py-1
rounded-full
text-xs
font-semibold
text-white
"

style={{

backgroundColor:
"var(--primary-color)"

}}

>

{exam.level}

</span>


</td>





{/* SUBJECT */}

<td className="p-4">

{exam.subject}

</td>





{/* YEAR */}

<td className="p-4">

{exam.year}

</td>







{/* FILES */}

<td className="p-4">


<div className="flex gap-3">


{

exam.fileUrl &&


<a

href={exam.fileUrl}

target="_blank"

rel="noreferrer"

className="
flex
items-center
gap-1
text-sm
"

style={{

color:
"var(--primary-color)"

}}

>

<FiDownload/>

Questions

</a>

}





{

exam.answersPdf &&


<a

href={exam.answersPdf}

target="_blank"

rel="noreferrer"

className="
flex
items-center
gap-1
text-sm
text-green-600
"

>

<FiDownload/>

Answers

</a>

}



</div>


</td>









{/* ACTIONS */}

<td className="p-4">


<div className="flex gap-3">


<button

onClick={()=>onEdit(exam)}

className="
p-2
rounded-lg
text-white
"

style={{

backgroundColor:
"var(--primary-color)"

}}

>

<FiEdit/>

</button>







<button

onClick={()=>onDelete(exam)}

className="
p-2
rounded-lg
text-white
bg-red-600
"

>

<FiTrash2/>

</button>



</div>


</td>







</tr>


))


)

}



</tbody>



</table>



</div>


);


}