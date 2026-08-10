import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";


import YoutubeGrid from "../../components/youtube/YoutubeGrid";


import {
  getChannelVideos
} from "../../services/youtubeService";


import {
  getYoutubeChannel
} from "../../services/youtubeChannelService";





export default function YoutubeChannel(){


  const {
    slug
  } = useParams();




  const [
    channel,
    setChannel
  ] = useState(null);



  const [
    videos,
    setVideos
  ] = useState([]);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    channelLoading,
    setChannelLoading
  ] = useState(true);






  // ===============================
  // LOAD CHANNEL
  // ===============================


  useEffect(()=>{


    if(slug){

      loadChannel();

    }


  },[slug]);





  async function loadChannel(){


    try{


      setChannelLoading(true);



      const data =
        await getYoutubeChannel(slug);



      setChannel(
        data.data || data
      );



    }catch(error){


      console.error(
        "CHANNEL LOAD ERROR:",
        error
      );


      setChannel(null);



    }finally{


      setChannelLoading(false);


    }


  }








  // ===============================
  // LOAD VIDEOS
  // ===============================


  useEffect(()=>{


    if(slug){

      loadVideos();

    }


  },[slug]);







  async function loadVideos(){


    try{


      setLoading(true);



      const data =
        await getChannelVideos(slug);



      setVideos(
        data.data || data
      );



    }catch(error){


      console.error(
        "VIDEOS LOAD ERROR:",
        error
      );


      setVideos([]);



    }finally{


      setLoading(false);


    }


  }








  if(channelLoading){


    return (

      <div

        className="
        min-h-screen
        flex
        items-center
        justify-center
        "

        style={{

          backgroundColor:
          "var(--background-color)",

          color:
          "var(--text-color)"

        }}

      >

        <h1 className="text-3xl font-bold">

          Loading Channel...

        </h1>


      </div>

    );


  }









  if(!channel){


    return (

      <div

        className="
        min-h-screen
        flex
        items-center
        justify-center
        "

        style={{

          backgroundColor:
          "var(--background-color)",

          color:
          "var(--text-color)"

        }}

      >

        <h1 className="text-3xl font-bold">

          Channel Not Found ❌

        </h1>


      </div>


    );


  }









  return (

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





        <Link

          to="/youtube"

          className="
          inline-block
          mb-8
          px-5
          py-3
          rounded-xl
          text-white
          "

          style={{

            backgroundColor:
            "var(--primary-color)"

          }}

        >

          ← Media Hub

        </Link>









        <div

          className="
          rounded-3xl
          overflow-hidden
          shadow-xl
          "

          style={{

            backgroundColor:
            "var(--card-color)",

            border:
            "1px solid var(--border-color)"

          }}

        >




          {
            channel.coverImage && (

              <img

                src={channel.coverImage}

                alt="cover"

                className="
                w-full
                h-72
                object-cover
                "

                onError={(e)=>{

                  e.currentTarget.style.display="none";

                }}

              />

            )
          }







          <div

            className="
            p-10
            flex
            flex-col
            md:flex-row
            items-center
            gap-8
            "

          >





            {

              channel.profileImage ? (


                <img

                  src={channel.profileImage}

                  alt={channel.name}

                  className="
                  w-40
                  h-40
                  rounded-full
                  object-cover
                  border-4
                  "

                  onError={(e)=>{

                    e.currentTarget.style.display="none";

                  }}

                />


              ) : (


                <div className="text-8xl">

                  {channel.icon || "🎬"}

                </div>


              )

            }








            <div>


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

                {channel.name}


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

                {channel.description}


              </p>







              {
                channel.youtubeUrl && (

                  <a

                    href={channel.youtubeUrl}

                    target="_blank"

                    rel="noreferrer"

                    className="
                    inline-block
                    mt-6
                    px-6
                    py-3
                    rounded-xl
                    text-white
                    font-semibold
                    bg-red-600
                    hover:bg-red-700
                    "

                  >

                    Subscribe on YouTube ▶


                  </a>

                )

              }



            </div>



          </div>



        </div>












        <section className="mt-16">


          <h2

            className="
            text-3xl
            font-bold
            mb-8
            "

            style={{

              color:
              "var(--primary-color)"

            }}

          >

            Latest Videos 🎬


          </h2>






          {

            loading ? (


              <div className="text-center py-20">

                Loading videos...

              </div>



            ) : videos.length === 0 ? (


              <div className="text-center py-20">

                No videos uploaded yet.

              </div>



            ) : (


              <YoutubeGrid

                videos={videos}

              />


            )

          }




        </section>





      </div>



    </div>


  );


}