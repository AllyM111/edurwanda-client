import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBooks } from "../services/bookService";
import { getExams } from "../services/examService";


export default function SearchResults(){

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const query = params.get("q") || "";


    const [books,setBooks] = useState([]);
    const [exams,setExams] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        searchData();

    },[query]);




    const searchData = async()=>{

        try{


            const booksData = await getBooks();

            const examsData = await getExams();



            const keyword = query.toLowerCase();



            const filteredBooks = booksData.filter(
                (book)=>

                book.title
                ?.toLowerCase()
                .includes(keyword)

            );



            const filteredExams = examsData.filter(
                (exam)=>

                exam.title
                ?.toLowerCase()
                .includes(keyword)

            );



            setBooks(filteredBooks);

            setExams(filteredExams);


        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    };




return(

<div

className="
min-h-screen
py-20
"

style={{

backgroundColor:"var(--background-color)"

}}

>


<div className="max-w-7xl mx-auto px-6">


<h1

className="
text-4xl
font-bold
mb-10
"

style={{

color:"var(--primary-color)"

}}

>

Search Results For:

"{query}"

</h1>




{
loading ?

<p>

Loading...

</p>


:

(


<>



{/* BOOK RESULTS */}

<section className="mb-14">


<h2 className="text-2xl font-bold mb-6">

📚 Books

</h2>



<div className="grid md:grid-cols-3 gap-6">


{

books.map(book=>(


<Link

key={book.id}

to={`/books/${book.id}`}

className="
p-6
rounded-xl
shadow
"

style={{

backgroundColor:"var(--card-color)"

}}

>

<h3 className="font-bold">

{book.title}

</h3>


</Link>


))


}



</div>


</section>





{/* EXAM RESULTS */}


<section>


<h2 className="text-2xl font-bold mb-6">

📝 Exams

</h2>



<div className="grid md:grid-cols-3 gap-6">


{

exams.map(exam=>(


<Link

key={exam.id}

to={`/exams/${exam.id}`}

className="
p-6
rounded-xl
shadow
"

style={{

backgroundColor:"var(--card-color)"

}}

>


<h3 className="font-bold">

{exam.title}

</h3>


</Link>


))


}


</div>


</section>



</>


)


}



</div>


</div>

)


}