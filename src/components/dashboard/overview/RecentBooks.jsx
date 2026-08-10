import {
  FiBookOpen,
} from "react-icons/fi";


export default function RecentBooks({

  books = [],

}) {


  return (

    <div

      className="
      rounded-2xl
      shadow-md
      border
      p-6
      transition-all
      duration-300
      "

      style={{

        backgroundColor:
        "var(--card-color)",


        color:
        "var(--text-color)",


        borderColor:
        "var(--muted-color)"

      }}

    >





      {/* HEADER */}


      <div

        className="
        flex
        items-center
        gap-3
        mb-6
        "

      >



        <div

          className="
          w-12
          h-12
          rounded-xl
          flex
          items-center
          justify-center
          text-white
          text-xl
          "

          style={{

            backgroundColor:
            "var(--primary-color)"

          }}

        >

          <FiBookOpen />

        </div>






        <div>


          <h2

            className="
            text-xl
            font-bold
            "

          >

            Recent Books

          </h2>





          <p

            className="
            text-sm
            "

            style={{

              color:
              "var(--muted-color)"

            }}

          >

            Latest uploaded books

          </p>



        </div>



      </div>









      {

        books.length === 0 ?


        (


          <div

            className="
            text-center
            py-10
            "

            style={{

              color:
              "var(--muted-color)"

            }}

          >

            No books uploaded yet.


          </div>


        )



        :




        (


          <div

            className="
            space-y-4
            "

          >



            {

              books.map((book)=>(



                <div

                  key={book.id}

                  className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  pb-4
                  border-b
                  "

                  style={{

                    borderColor:
                    "var(--muted-color)"

                  }}

                >







                  {/* BOOK INFO */}



                  <div

                    className="
                    flex
                    items-center
                    gap-3
                    "

                  >




                    {


                      book.coverUrl ?



                      <img

                        src={book.coverUrl}

                        alt={book.title}

                        className="
                        w-12
                        h-12
                        rounded-lg
                        object-cover
                        "

                      />



                      :



                      <div

                        className="
                        w-12
                        h-12
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-white
                        font-bold
                        "

                        style={{

                          backgroundColor:
                          "var(--primary-color)"

                        }}

                      >

                        B

                      </div>



                    }








                    <div>



                      <p

                        className="
                        font-semibold
                        "

                      >

                        {book.title}


                      </p>





                      <p

                        className="
                        text-sm
                        "

                        style={{

                          color:
                          "var(--muted-color)"

                        }}

                      >

                        {
                          book.level ||
                          "Book"
                        }


                      </p>




                    </div>




                  </div>












                  {/* YEAR BADGE */}



                  {


                    book.year &&



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

                      {book.year}


                    </span>



                  }





                </div>



              ))



            }




          </div>



        )


      }







    </div>


  );


}