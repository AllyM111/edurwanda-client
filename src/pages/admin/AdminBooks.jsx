import { useEffect, useState } from "react";

import {
  getBooks,
  createBook,
  deleteBook,
} from "../../services/bookService";



const bookTypes = [
  {
    value:"EDUCATION_BOOK",
    label:"Education Book"
  },
  {
    value:"NORMAL_BOOK",
    label:"Normal Book"
  }
];



const educationLevels = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "TTC",
  "TSS-TVET"
];




export default function AdminBooks(){



const [books,setBooks]=useState([]);



const [form,setForm]=useState({

type:"EDUCATION_BOOK",

title:"",
author:"",
category:"",

level:"",
subject:"",
className:"",

description:"",
year:""

});



const [pdf,setPdf]=useState(null);

const [cover,setCover]=useState(null);





const loadBooks=async()=>{

try{

const data=await getBooks();

setBooks(data);


}catch(error){

console.log(error);

}

};




useEffect(()=>{

loadBooks();

},[]);






const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};







const handleSubmit=async(e)=>{

e.preventDefault();


const formData=new FormData();



Object.keys(form).forEach(key=>{

formData.append(
key,
form[key]
);

});



if(pdf){

formData.append(
"pdf",
pdf
);

}


if(cover){

formData.append(
"cover",
cover
);

}



try{


await createBook(formData);



alert("Book uploaded successfully");



setForm({

type:"EDUCATION_BOOK",

title:"",
author:"",
category:"",

level:"",
subject:"",
className:"",

description:"",
year:""

});


setPdf(null);

setCover(null);



loadBooks();



}catch(error){

console.log(error);

alert("Upload failed");

}


};







const handleDelete=async(id)=>{


if(!window.confirm(
"Delete this book?"
))
return;



try{


await deleteBook(id);


loadBooks();



}catch(error){

console.log(error);

}


};







return (

<div className="p-6 space-y-8">



<h1 className="
text-3xl
font-bold
theme-text
">

Books Management

</h1>







{/* UPLOAD */}

<div className="
theme-card
rounded-2xl
p-6
shadow-xl
">


<h2 className="
text-xl
font-bold
mb-5
theme-text
">

Upload New Book

</h2>





<form
onSubmit={handleSubmit}
className="space-y-4"
>




<label className="theme-muted">
Book Type
</label>



<select

name="type"

value={form.type}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

>


{
bookTypes.map(type=>(

<option

key={type.value}

value={type.value}

>

{type.label}

</option>

))

}

</select>







<input

name="title"

placeholder="Book title"

value={form.title}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>







{
form.type==="NORMAL_BOOK" &&

<>


<input

name="author"

placeholder="Author"

value={form.author}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>





<input

name="category"

placeholder="Category"

value={form.category}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>


</>

}








{
form.type==="EDUCATION_BOOK" &&

<>


<select

name="level"

value={form.level}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

>


<option value="">

Select Level

</option>


{
educationLevels.map(level=>(

<option

key={level}

value={level}

>

{level}

</option>

))

}


</select>





<input

name="subject"

placeholder="Subject"

value={form.subject}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>





<input

name="className"

placeholder="Class Name"

value={form.className}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>


</>

}







<input

name="year"

placeholder="Year"

value={form.year}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

/>







<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
h-28
"

/>







<div>

<label className="theme-muted">

PDF File

</label>


<input

type="file"

accept=".pdf"

onChange={(e)=>setPdf(e.target.files[0])}

/>


</div>






<div>

<label className="theme-muted">

Cover Image

</label>


<input

type="file"

accept="image/*"

onChange={(e)=>setCover(e.target.files[0])}

/>


</div>







<button

className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
hover:bg-blue-700
"

>

Upload Book

</button>




</form>


</div>








{/* TABLE */}


<div className="
theme-card
rounded-2xl
p-6
shadow-xl
">


<h2 className="
text-xl
font-bold
mb-5
theme-text
">

Books Library

</h2>





<table className="w-full">


<thead>


<tr className="
border-b
theme-text
">


<th className="p-3 text-left">
Title
</th>

<th>
Type
</th>

<th>
Level
</th>

<th>
Action
</th>


</tr>


</thead>





<tbody>


{
books.map(book=>(


<tr
key={book.id}
className="
border-b
hover:bg-gray-500/10
"
>


<td className="p-3">

{book.title}

</td>


<td>

{book.type}

</td>



<td>

{book.level || "-"}

</td>




<td>


<button

onClick={()=>handleDelete(book.id)}

className="
bg-red-600
text-white
px-3
py-1
rounded-lg
"

>

Delete

</button>


</td>


</tr>


))

}



</tbody>


</table>


</div>





</div>

);



}