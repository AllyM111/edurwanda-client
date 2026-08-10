import { Link } from "react-router-dom";

export default function BookCard({ book }) {


  const downloadBook = () => {


    if (!book.id) {

      alert("Book ID missing");

      return;

    }


    window.open(
      `/api/books/download/${book.id}`,
      "_blank"
    );


  };



  return (

    <div
      className="
      rounded-2xl
      overflow-hidden
      shadow-lg
      border
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      group
      "
      style={{
        backgroundColor:"var(--card-color)",
        borderColor:"var(--border-color)",
      }}
    >


      {/* COVER */}

      <div className="relative h-72 overflow-hidden">


        <img

          src={
            book.coverUrl ||
            "https://via.placeholder.com/400x600?text=No+Cover"
          }

          alt={book.title}

          className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
          "

        />


        <div className="absolute top-4 left-4">


          <span

            className="
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            "

            style={{

              backgroundColor:"rgba(37,99,235,.15)",

              color:"var(--primary-color)"

            }}

          >

            {
              book.type === "NORMAL_BOOK"
              ?
              "Normal Book"
              :
              "Education Book"
            }


          </span>


        </div>


      </div>





      {/* CONTENT */}


      <div className="p-5">


        <h2

          className="
          text-xl
          font-bold
          line-clamp-2
          "

          style={{
            color:"var(--text-color)"
          }}

        >

          {book.title}


        </h2>




        <p

          className="mt-2 text-sm"

          style={{
            color:"var(--muted-color)"
          }}

        >

          {
            book.description
            ?
            book.description.substring(0,100)+"..."
            :
            "No description available."
          }


        </p>





        {/* INFO */}


        <div className="mt-5 space-y-2 text-sm">


          <InfoRow
            label="Subject"
            value={book.subject}
          />


          <InfoRow
            label="Level"
            value={book.level}
          />


          <InfoRow
            label="Year"
            value={book.year}
          />


        </div>





        {/* BUTTONS */}


        <div className="grid grid-cols-2 gap-3 mt-6">


          <Link

            to={`/books/${book.id}`}

            className="
            text-center
            py-3
            rounded-xl
            font-semibold
            "

            style={{

              backgroundColor:"var(--primary-color)",

              color:"#fff"

            }}

          >

            View Book


          </Link>





          <button

            onClick={downloadBook}

            className="
            py-3
            rounded-xl
            font-semibold
            bg-green-600
            hover:bg-green-700
            text-white
            "

          >

            Download


          </button>


        </div>



      </div>



    </div>


  );


}





function InfoRow({label,value}){


return (

<div className="flex justify-between">


<span

style={{
color:"var(--muted-color)"
}}

>

{label}

</span>



<strong

style={{
color:"var(--text-color)"
}}

>

{value || "-"}


</strong>


</div>

);


}