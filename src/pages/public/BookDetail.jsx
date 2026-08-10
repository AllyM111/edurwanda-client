import {
  useEffect,
  useState
} from "react";


import {
  useNavigate,
  useParams,
  Link
} from "react-router-dom";


import {
  getBookById,
  getBooks
} from "../../services/bookService";


import ProPdfReader from "../../components/pdf/ProPdfReader";





export default function BookDetail(){


const {id}=useParams();

const navigate=useNavigate();



const [book,setBook]=useState(null);

const [books,setBooks]=useState([]);

const [loading,setLoading]=useState(true);

const [readerOpen,setReaderOpen]=useState(false);






useEffect(()=>{

loadBook();

loadBooks();

},[id]);







async function loadBook(){

try{


const data =
await getBookById(id);


setBook(data);



}
catch(error){

console.error(
"BOOK ERROR:",
error
);


}
finally{

setLoading(false);

}

}








async function loadBooks(){

try{


const data =
await getBooks();


setBooks(data);


}
catch(error){

console.error(error);

}


}








async function openReader(){


if(!book?.pdfUrl){

alert(
"PDF file unavailable"
);

return;

}



try{


await fetch(

`http://localhost:5000/api/reader/view/${book.id}`,

{
method:"POST"
}

);



}
catch(error){

console.log(error);

}



setReaderOpen(true);


}








function downloadBook(){


if(!book){

return;

}



window.location.href =


`http://localhost:5000/api/books/download/${book.id}`;


}








if(loading){

return(

<div className="
flex
justify-center
items-center
h-screen
text-xl
">

Loading book...

</div>

);

}







if(!book){


return(

<div className="
text-center
py-20
">


<h2 className="
text-3xl
font-bold
">

Book Not Found

</h2>



<button

onClick={()=>navigate("/books")}

className="
mt-6
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

>

Back To Books

</button>



</div>

);

}







const relatedBooks =

books.filter(

(item)=>

item.id !== book.id &&

(
item.subject === book.subject ||
item.level === book.level
)

);








return(


<div className="
max-w-7xl
mx-auto
px-6
py-10
">







<button

onClick={()=>navigate("/books")}

className="
mb-8
bg-gray-900
text-white
px-5
py-2
rounded-lg
"

>

← Back

</button>









<div className="
grid
lg:grid-cols-2
gap-10
">





<div>


<img

src={
book.coverUrl ||
"https://via.placeholder.com/400x550"
}

alt={book.title}

className="
rounded-2xl
shadow-xl
w-full
"

/>


</div>








<div>



<span className="
bg-blue-100
text-blue-700
px-4
py-1
rounded-full
text-sm
">

{book.category}

</span>






<h1 className="
text-4xl
font-bold
mt-5
">

{book.title}

</h1>







<p className="
text-gray-600
mt-6
leading-8
">

{
book.description ||
"No description available."
}

</p>








<div className="
grid
grid-cols-2
gap-5
mt-8
">



<div>

<strong>
Author
</strong>

<p>
{book.author || "-"}
</p>

</div>




<div>

<strong>
Subject
</strong>

<p>
{book.subject || "-"}
</p>

</div>





<div>

<strong>
Level
</strong>

<p>
{book.level || "-"}
</p>

</div>





<div>

<strong>
Year
</strong>

<p>
{book.year || "-"}
</p>

</div>




</div>








<div className="
flex
gap-4
mt-10
flex-wrap
">





<button

onClick={openReader}

className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

>

📖 Read Book

</button>






<button

onClick={downloadBook}

className="
bg-green-600
text-white
px-6
py-3
rounded-xl
"

>

⬇ Download PDF

</button>






</div>








<div className="
mt-6
flex
gap-6
text-gray-500
">


<p>

👁 {book.views || 0} views

</p>



<p>

⬇ {book.downloads || 0} downloads

</p>


</div>





</div>


</div>









<div className="
mt-20
">


<h2 className="
text-3xl
font-bold
mb-8
">

Related Books

</h2>







<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{

relatedBooks.map(item=>(


<Link

key={item.id}

to={`/books/${item.id}`}

className="
bg-white
rounded-2xl
shadow
overflow-hidden
"

>


<img

src={
item.coverUrl ||
"https://via.placeholder.com/300x400"
}

alt={item.title}

className="
h-56
w-full
object-cover
"

/>





<div className="p-5">


<h3 className="font-bold">

{item.title}

</h3>


<p className="text-gray-500">

{item.subject}

</p>


</div>



</Link>


))

}


</div>



</div>









{

readerOpen && (


<div

className="
fixed
inset-0
bg-black/90
z-50
"

>


<div

className="
bg-white
w-full
h-full
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


<h2 className="font-bold">

{book.title}

</h2>




<button

onClick={()=>setReaderOpen(false)}

className="
bg-red-600
text-white
px-4
py-2
rounded
"

>

Close

</button>



</div>







<ProPdfReader

fileUrl={book.pdfUrl}

bookId={book.id}

type="book"

/>






</div>


</div>


)

}





</div>


);


}