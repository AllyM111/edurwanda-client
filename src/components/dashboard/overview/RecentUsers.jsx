import { FiUsers } from "react-icons/fi";


export default function RecentUsers({

  users = [],

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

          <FiUsers />

        </div>





        <div>


          <h2

            className="
            text-xl
            font-bold
            "

          >

            Recent Users

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

            Latest registered users

          </p>


        </div>


      </div>







      {
        users.length === 0 ?


        (

          <div

            className="
            py-10
            text-center
            "

            style={{

              color:
              "var(--muted-color)"

            }}

          >

            No users found.

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

              users.map((user)=>(


                <div

                  key={user.id}

                  className="
                  flex
                  items-center
                  justify-between
                  pb-4
                  border-b
                  "

                  style={{

                    borderColor:
                    "var(--muted-color)"

                  }}

                >







                  {/* USER INFO */}


                  <div

                    className="
                    flex
                    items-center
                    gap-3
                    "

                  >




                    {/* AVATAR */}


                    <div

                      className="
                      w-11
                      h-11
                      rounded-full
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

                      {
                        user.name
                        ?.charAt(0)
                        ?.toUpperCase()
                      }


                    </div>








                    <div>


                      <p

                        className="
                        font-semibold
                        "

                      >

                        {user.name}

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

                        {user.email}

                      </p>



                    </div>



                  </div>









                  {/* ROLE BADGE */}



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

                      user.role === "ADMIN"

                      ?

                      "#dc2626"


                      :

                      "var(--primary-color)"


                    }}

                  >

                    {user.role}


                  </span>







                </div>


              ))

            }


          </div>


        )


      }






    </div>


  );

}