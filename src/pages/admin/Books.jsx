import {
  useState
} from "react";


import BooksTable from "../../components/dashboard/books/BooksTable";

import UploadBookModal from "../../components/dashboard/books/UploadBookModal";

import EditBookModal from "../../components/dashboard/books/EditBookModal";





export default function Books(){



const [
openUpload,
setOpenUpload
] = useState(false);



const [
openEdit,
setOpenEdit
] = useState(false);




const [
books,
setBooks
] = useState([]);




const [
formData,
setFormData
] = useState({

title:"",
author:"",
category:"",
level:"",
subject:"",
description:"",
year:"",
pdf:null,
cover:null

});





const [
search,
setSearch
] = useState("");









// ==========================
// FILE CHANGE
// ==========================


const handleFileChange=(e)=>{


const {
name,
files
}=e.target;



setFormData({

...formData,

[name]:files[0]

});


};









// ==========================
// UPLOAD
// ==========================


const handleUpload=async(e)=>{


e.preventDefault();



console.log(
"Upload data:",
formData
);


// backend integration later


};









// ==========================
// UPDATE
// ==========================


const handleUpdate=(e)=>{


e.preventDefault();



console.log(
"Update:",
formData
);


};









// ==========================
// EDIT
// ==========================


const handleEdit=(book)=>{


setFormData(book);


setOpenEdit(true);



};









// ==========================
// DELETE
// ==========================


const handleDelete=(book)=>{


console.log(
"Delete:",
book
);



};









const filteredBooks = books.filter((book)=>

book.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);









return (


<div

className="
p-6
space-y-6
"

style={{

backgroundColor:
"var(--background-color)",

color:
"var(--text-color)"

}}

>







{/* HEADER */}



<div

className="
text-3xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}


>


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

Books Management

</h1>



<p

className="mt-2"

style={{

color:
"var(--muted-color)"

}}

>

Manage EduRwanda student books

</p>



</div>









<button


onClick={()=>setOpenUpload(true)}



className="
px-5
py-3
rounded-lg
text-white
font-semibold
transition
"


style={{


backgroundColor:
"var(--primary-color)"


}}



>

+ Add Book


</button>





</div>












{/* SEARCH */}




<div


className="
rounded-2xl
p-5
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


<input


placeholder="Search books..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
w-full
p-3
rounded-xl
border
outline-none
"


style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


/>



</div>












{/* TABLE */}





<div


className="
rounded-2xl
border
shadow-md
p-5
"


style={{


backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"


}}


>


<BooksTable


books={filteredBooks}


onEdit={handleEdit}


onDelete={handleDelete}



/>


</div>












{/* UPLOAD MODAL */}




<UploadBookModal


open={openUpload}


close={()=>setOpenUpload(false)}


formData={formData}


setFormData={setFormData}


handleUpload={handleUpload}


handleFileChange={handleFileChange}



/>









{/* EDIT MODAL */}




<EditBookModal


open={openEdit}


close={()=>setOpenEdit(false)}


formData={formData}


setFormData={setFormData}


handleUpdate={handleUpdate}


handleFileChange={handleFileChange}



/>









</div>



);


}