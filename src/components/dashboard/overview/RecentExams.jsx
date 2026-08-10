import {
  FiFileText,
} from "react-icons/fi";



export default function RecentExams({

  exams = [],

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


          <FiFileText />


        </div>






        <div>



          <h2

            className="
            text-xl
            font-bold
            "

          >


            Recent Exams


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


            Latest uploaded exams


          </p>





        </div>




      </div>












      {


        exams.length === 0 ?



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


            No exams uploaded yet.


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


              exams.map((exam)=>(



                <div



                  key={exam.id}



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







                  {/* EXAM INFORMATION */}



                  <div

                    className="
                    flex
                    items-center
                    gap-3
                    "

                  >






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


                      PDF


                    </div>











                    <div>



                      <p

                        className="
                        font-semibold
                        "

                      >


                        {exam.title}


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
                          exam.subject ||
                          "Exam"
                        }



                        {


                          exam.level &&

                          ` • ${exam.level}`


                        }


                      </p>





                    </div>





                  </div>














                  {/* YEAR */}




                  {


                    exam.year &&



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



                      {exam.year}



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