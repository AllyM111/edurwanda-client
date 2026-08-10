export default function SystemSettings({
  settings,
  onChange,
}) {


  return (

    <div className="bg-[var(--card-color)]">


      <h2 className="text-xl font-semibold mb-6">

        System

      </h2>





      <div className="grid md:grid-cols-2 gap-6">





        {/* Upload Size */}

        <div>


          <label className="block mb-2">

            Maximum Upload Size (MB)

          </label>



          <input


            type="number"



            value={
              settings?.maxUploadSize || 20
            }



            onChange={(e)=>

              onChange(
                "maxUploadSize",
                Number(e.target.value)
              )

            }



            className="
            w-full
            bg-gray-800
            rounded-lg
            p-3
            "



          />


        </div>








        {/* Logo URL */}

        <div>


          <label className="block mb-2">

            Logo URL

          </label>



          <input


            type="text"



            value={
              settings?.logoUrl || ""
            }



            onChange={(e)=>

              onChange(
                "logoUrl",
                e.target.value
              )

            }



            placeholder="https://logo-url.com/logo.png"



            className="
            w-full
            bg-gray-800
            rounded-lg
            p-3
            "



          />



        </div>








        {/* Favicon URL */}

        <div>


          <label className="block mb-2">

            Favicon URL

          </label>



          <input


            type="text"



            value={
              settings?.faviconUrl || ""
            }



            onChange={(e)=>

              onChange(
                "faviconUrl",
                e.target.value
              )

            }



            placeholder="https://favicon-url.com/favicon.ico"



            className="
            w-full
            bg-gray-800
            rounded-lg
            p-3
            "



          />


        </div>



      </div>







      {/* Preview */}

      <div className="mt-8">


        <h3 className="font-semibold mb-4">

          Branding Preview

        </h3>



        <div className="flex gap-6 items-center">





          {
            settings?.logoUrl && (

              <div>


                <p className="text-sm text-gray-400 mb-2">

                  Logo

                </p>


                <img

                  src={
                    settings.logoUrl
                  }


                  alt="Logo"


                  className="
                  w-24
                  h-24
                  rounded-lg
                  object-contain
                  bg-gray-800
                  "

                />


              </div>

            )
          }







          {
            settings?.faviconUrl && (

              <div>


                <p className="text-sm text-gray-400 mb-2">

                  Favicon

                </p>


                <img


                  src={
                    settings.faviconUrl
                  }


                  alt="Favicon"



                  className="
                  w-16
                  h-16
                  rounded-lg
                  object-contain
                  bg-gray-800
                  "


                />


              </div>

            )
          }



        </div>


      </div>







      {/* System Info */}

      <div className="mt-8 space-y-3 text-gray-300">


        <p>

          Version:

          <span className="ml-2 text-white">

            1.0.0

          </span>


        </p>





        <p>

          Environment:

          <span className="ml-2 text-green-400">

            Production

          </span>


        </p>



      </div>



    </div>

  );


}