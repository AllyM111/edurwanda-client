export default function BooksTable({
books,
onEdit,
onDelete
}){


return (

<div
className="
bg-[var(--card-color)]
rounded-2xl
shadow
p-6
"
>


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

Books Library

</h2>


<p className="
text-gray-500
">

{books.length} Books

</p>


</div>





<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr
className="
border-b
text-left
"
>


<th className="p-3">
Title
</th>


<th>
Type
</th>


<th>
Level
</th>


<th>
Subject
</th>


<th>
Year
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{

books.length===0 ?


<tr>

<td

colSpan="6"

className="
text-center
py-8
text-gray-500
"

>

No books found

</td>


</tr>



:


books.map((book)=>(


<tr

key={book.id}

className="
border-b
hover:bg-gray-50
"

>


<td className="p-3">


<div className="
flex
items-center
gap-3
">


{

book.coverUrl &&

<img

src={book.coverUrl}

className="
w-10
h-12
rounded
object-cover
"

/>

}



<span>

{book.title}

</span>


</div>


</td>





<td>


<span

className="
px-3
py-1
rounded-full
text-sm
bg-blue-100
text-blue-700
"

>

{

book.type==="NORMAL_BOOK"

?

"Normal"

:

"Education"

}


</span>


</td>





<td>

{book.level || "-"}

</td>





<td>

{book.subject || "-"}

</td>





<td>

{book.year || "-"}

</td>






<td>


<button

onClick={()=>onEdit(book)}

className="
bg-blue-600
text-white
px-3
py-1
rounded-lg
mr-2
"

>

Edit

</button>





<button

onClick={()=>onDelete(book)}

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