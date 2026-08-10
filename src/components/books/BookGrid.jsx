import BookCard from "./BookCard";


export default function BookGrid({books}){


if(!books.length){

return (

<div className="
text-center
py-20
text-gray-500
">

No books found 📚

</div>

)

}



return (

<div className="
grid
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-6
">


{
books.map((book)=>(

<BookCard

key={book.id || book.title}

book={book}

/>

))

}


</div>


)


}