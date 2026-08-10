import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getYoutubeChannels } from "../../services/youtubeChannelService";



export default function Youtube(){


  const [channels,setChannels] = useState([]);

  const [loading,setLoading] = useState(true);





  // ======================================
  // LOAD CHANNELS FROM DATABASE
  // ======================================

  useEffect(()=>{

    loadChannels();

  },[]);





  async function loadChannels(){

    try{


      setLoading(true);


      const data =
        await getYoutubeChannels();



      setChannels(data);



    }catch(error){


      console.error(
        "CHANNEL LOAD ERROR:",
        error
      );


      setChannels([]);



    }finally{


      setLoading(false);


    }


  }






  return(


    <div

      className="
      min-h-screen
      py-16
      "

      style={{

        backgroundColor:
          "var(--background-color)",

        color:
          "var(--text-color)"

      }}

    >




      <div

        className="
        max-w-7xl
        mx-auto
        px-6
        "

      >





        {/* HEADER */}


        <div

          className="
          text-center
          mb-16
          "

        >


          <h1

            className="
            text-5xl
            font-bold
            "

            style={{

              color:
              "var(--primary-color)"

            }}

          >

            EduRwanda Media Hub 🎥


          </h1>





          <p

            className="
            mt-5
            text-lg
            "

            style={{

              color:
              "var(--muted-color)"

            }}

          >

            Learn, watch and discover content from our official channels.


          </p>



        </div>









        {/* LOADING */}


        {
          loading && (


            <div

              className="
              text-center
              py-20
              text-xl
              "

            >

              Loading channels...


            </div>


          )

        }









        {/* EMPTY */}


        {
          !loading &&
          channels.length === 0 && (


            <div

              className="
              text-center
              py-20
              text-xl
              "

            >

              No channels available yet.


            </div>


          )

        }









        {/* CHANNEL GRID */}



        <div

          className="
          grid
          md:grid-cols-2
          gap-10
          "

        >





          {

            channels.map((channel)=>(



              <div

                key={channel.id}

                className="
                rounded-3xl
                overflow-hidden
                shadow-xl
                transition
                hover:-translate-y-2
                "

                style={{

                  backgroundColor:
                  "var(--card-color)",


                  border:
                  "1px solid var(--border-color)"

                }}

              >







                {/* COVER IMAGE */}


                <div

                  className="
                  h-48
                  w-full
                  "

                >


                  {

                    channel.coverImage ? (


                      <img

                        src={channel.coverImage}

                        alt={channel.name}


                        className="
                        w-full
                        h-full
                        object-cover
                        "

                      />


                    ) : (


                      <div

                        className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-7xl
                        "

                      >

                        {
                          channel.icon || "🎬"
                        }


                      </div>


                    )


                  }


                </div>









                <div className="p-10">







                  <div

                    className="
                    flex
                    items-center
                    gap-6
                    "

                  >






                    {/* PROFILE IMAGE */}



                    {

                      channel.profileImage ? (


                        <img

                          src={channel.profileImage}

                          alt={channel.name}


                          className="
                          w-28
                          h-28
                          rounded-full
                          object-cover
                          border-4
                          shadow-lg
                          "

                        />


                      ) : (


                        <div

                          className="
                          w-28
                          h-28
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-5xl
                          "

                        >

                          {
                            channel.icon || "🎬"
                          }


                        </div>


                      )


                    }









                    <div>



                      <h2

                        className="
                        text-3xl
                        font-bold
                        "

                      >

                        {
                          channel.name
                        }


                      </h2>






                      <p

                        className="
                        mt-3
                        "

                        style={{

                          color:
                          "var(--muted-color)"

                        }}

                      >

                        {
                          channel.description
                        }


                      </p>






                      {

                        channel.category && (


                          <span

                            className="
                            inline-block
                            mt-4
                            px-4
                            py-1
                            rounded-full
                            text-sm
                            text-white
                            "

                            style={{

                              backgroundColor:
                              "var(--primary-color)"

                            }}

                          >

                            {
                              channel.category
                            }


                          </span>


                        )

                      }





                    </div>







                  </div>









                  {/* OPEN CHANNEL */}



                  <Link


                    to={`/youtube/${channel.slug}`}


                    className="
                    inline-block
                    mt-8
                    px-6
                    py-3
                    rounded-xl
                    text-white
                    font-semibold
                    "

                    style={{

                      backgroundColor:
                      "var(--primary-color)"

                    }}


                  >

                    Open Channel →


                  </Link>







                  {/* YOUTUBE BUTTON */}



                  {

                    channel.youtubeUrl && (


                      <a

                        href={channel.youtubeUrl}

                        target="_blank"

                        rel="noreferrer"


                        className="
                        inline-block
                        ml-4
                        mt-8
                        px-6
                        py-3
                        rounded-xl
                        bg-red-600
                        text-white
                        font-semibold
                        "

                      >

                        YouTube ▶


                      </a>


                    )


                  }









                </div>








              </div>



            ))

          }





        </div>







      </div>



    </div>


  );


}