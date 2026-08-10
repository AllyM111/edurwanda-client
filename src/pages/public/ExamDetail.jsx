import {
  useEffect,
  useState
} from "react";


import {
  useNavigate,
  useParams
} from "react-router-dom";


import {
  getExams
} from "../../services/examService";


import ProPdfReader from "../../components/pdf/ProPdfReader";






export default function ExamDetail(){


const {id}=useParams();

const navigate=useNavigate();



const [exam,setExam]=useState(null);

const [loading,setLoading]=useState(true);

const [readerOpen,setReaderOpen]=useState(false);








useEffect(()=>{


loadExam();


},[id]);








async function loadExam(){


try{


const data =
await getExams();



const selected =

data.find(

item =>

String(item.id) === String(id)

);



setExam(selected);



}

catch(error){


console.log(
"EXAM ERROR:",
error
);


}

finally{


setLoading(false);


}



}









function downloadExam(){


if(!exam?.fileUrl){


alert(
"Exam PDF unavailable"
);


return;


}



window.location.href =


`http://localhost:5000/api/exams/download/${exam.id}`;



}









if(loading){


return(


<div

className="
h-screen
flex
items-center
justify-center
text-xl
"

>


Loading exam...


</div>


);


}









if(!exam){


return(


<div

className="
text-center
py-20
"

>


<h1

className="
text-3xl
font-bold
"

>

Exam Not Found

</h1>






<button

onClick={()=>navigate("/exams")}

className="
mt-5
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

>


Back Exams


</button>





</div>


);


}









return(



<div

className="
min-h-screen
py-10
px-6
"

style={{

backgroundColor:
"var(--background-color)",


color:
"var(--text-color)"

}}

>




<div

className="
max-w-5xl
mx-auto
"

>






<button

onClick={()=>navigate("/exams")}

className="
mb-8
bg-gray-900
text-white
px-5
py-3
rounded-xl
"

>


← Back


</button>









<div

className="
rounded-2xl
shadow-xl
p-8
"

style={{

backgroundColor:
"var(--card-color)"

}}

>







<div

className="
text-center
mb-8
"

>


<div

className="
text-8xl
"

>

📝

</div>






<h1

className="
text-4xl
font-bold
mt-4
"

>


{exam.title}


</h1>







<p

className="
mt-4
"

>


{

exam.description ||

"Rwanda national examination paper"

}


</p>






</div>









<div

className="
grid
md:grid-cols-3
gap-5
"

>






<div>


<p className="opacity-70">

Level

</p>


<h3 className="font-bold">

{exam.level || "-"}

</h3>


</div>








<div>


<p className="opacity-70">

Subject

</p>


<h3 className="font-bold">

{exam.subject || "-"}

</h3>


</div>








<div>


<p className="opacity-70">

Year

</p>


<h3 className="font-bold">

{exam.year || "-"}

</h3>


</div>






</div>









<div

className="
flex
gap-5
mt-10
flex-wrap
"

>








<button


onClick={()=>setReaderOpen(true)}


className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
font-bold
"


>


📖 Read Exam


</button>









<button


onClick={downloadExam}


className="
bg-green-600
text-white
px-6
py-3
rounded-xl
font-bold
"


>


⬇ Download PDF


</button>








</div>









</div>






</div>












{

readerOpen &&



<div


className="
fixed
inset-0
bg-black
z-50
"


>






<div

className="
h-full
bg-white
"

>






<div

className="
flex
justify-between
p-4
border-b
"

>



<h2

className="
font-bold
"

>

{exam.title}

</h2>






<button


onClick={()=>setReaderOpen(false)}


className="
bg-red-600
text-white
px-5
py-2
rounded
"


>


Close


</button>






</div>









<ProPdfReader


fileUrl={exam.fileUrl}


bookId={exam.id}


type="exam"


/>








</div>





</div>



}






</div>



);


}