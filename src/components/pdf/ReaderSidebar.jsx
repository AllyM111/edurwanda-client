import {
  FiBookmark,
  FiFileText,
  FiTrash2,
  FiArrowRight
} from "react-icons/fi";





export default function ReaderSidebar({

open,

bookmarks,

notes,

deleteBookmark,

deleteNote,

goToPage

}){



if(!open){

return null;

}







return (


<div

className="
fixed
right-5
top-20
w-80
max-h-[75vh]
overflow-y-auto
bg-white
shadow-2xl
rounded-xl
z-40
border
"

>








{/* HEADER */}

<div

className="
bg-gray-900
text-white
p-4
rounded-t-xl
"

>


<h2

className="
font-bold
text-lg
"

>

Reader Library

</h2>


<p

className="
text-sm
text-gray-300
"

>

Bookmarks & Notes

</p>


</div>









{/* BOOKMARKS */}

<div

className="
p-4
"

>


<div

className="
flex
items-center
gap-2
font-bold
mb-3
"

>


<FiBookmark/>

Bookmarks


</div>







{

bookmarks.length===0 ?


<p

className="
text-gray-500
text-sm
"

>

No bookmarks yet

</p>



:


bookmarks.map(item=>(


<div

key={item.id}

className="
flex
items-center
justify-between
border-b
py-2
"

>


<button


onClick={()=>goToPage(item.page)}



className="
flex
items-center
gap-2
text-blue-600
"

>


<FiArrowRight/>


Page {item.page}


</button>









<button


onClick={()=>deleteBookmark(item.id)}


className="
text-red-500
hover:text-red-700
"

>


<FiTrash2/>


</button>





</div>



))


}



</div>









{/* NOTES */}


<div

className="
p-4
border-t
"

>



<div

className="
flex
items-center
gap-2
font-bold
mb-3
"

>


<FiFileText/>


Notes


</div>








{

notes.length===0 ?


<p

className="
text-gray-500
text-sm
"

>

No notes saved

</p>



:


notes.map(note=>(



<div


key={note.id}


className="
border
rounded-lg
p-3
mb-3
"

>






<div

className="
flex
justify-between
items-center
mb-2
"

>


<button


onClick={()=>goToPage(note.page)}


className="
text-blue-600
text-sm
"

>

Page {note.page}

</button>






<button


onClick={()=>deleteNote(note.id)}


className="
text-red-500
"

>

<FiTrash2/>


</button>



</div>







<p

className="
text-gray-700
text-sm
"

>

{note.content}

</p>





</div>



))


}



</div>








</div>



);



}