export default function SecuritySettings({
  settings,
  onChange,
}) {


  return (

    <div className="bg-[var(--card-color)]">


      <h2 className="text-xl font-semibold mb-6">

        Security & Permissions

      </h2>




      <div className="space-y-5">





        {/* Registration */}

        <div className="
          flex
          items-center
          justify-between
          bg-[var(--card-color)]
          rounded-lg
          p-4
        ">


          <div>

            <h3 className="font-medium">

              Allow Registration

            </h3>


            <p className="text-sm text-gray-400">

              Users can create new accounts

            </p>


          </div>



          <input

            type="checkbox"


            checked={
              settings?.allowRegistration || false
            }


            onChange={(e)=>

              onChange(
                "allowRegistration",
                e.target.checked
              )

            }


            className="w-5 h-5"


          />


        </div>








        {/* Book Downloads */}

        <div className="
          flex
          items-center
          justify-between
          bg-[var(--card-color)]
          rounded-lg
          p-4
        ">


          <div>


            <h3 className="font-medium">

              Allow Book Downloads

            </h3>


            <p className="text-sm text-gray-400">

              Students can download books

            </p>


          </div>



          <input


            type="checkbox"



            checked={
              settings?.allowBookDownloads || false
            }



            onChange={(e)=>

              onChange(
                "allowBookDownloads",
                e.target.checked
              )

            }



            className="w-5 h-5"



          />


        </div>









        {/* Exam Downloads */}

        <div className="
          flex
          items-center
          justify-between
          bg-[var(--card-color)]
          rounded-lg
          p-4
        ">


          <div>


            <h3 className="font-medium">

              Allow Exam Downloads

            </h3>


            <p className="text-sm text-gray-400">

              Students can download exams

            </p>


          </div>



          <input


            type="checkbox"



            checked={
              settings?.allowExamDownloads || false
            }



            onChange={(e)=>

              onChange(
                "allowExamDownloads",
                e.target.checked
              )

            }



            className="w-5 h-5"



          />


        </div>









        {/* Maintenance Mode */}

        <div className="
          flex
          items-center
          justify-between
          bg-[var(--card-color)]
          rounded-lg
          p-4
        ">


          <div>


            <h3 className="font-medium">

              Maintenance Mode

            </h3>


            <p className="text-sm text-gray-400">

              Temporarily disable public access

            </p>


          </div>



          <input


            type="checkbox"



            checked={
              settings?.maintenanceMode || false
            }



            onChange={(e)=>

              onChange(
                "maintenanceMode",
                e.target.checked
              )

            }



            className="w-5 h-5"



          />


        </div>



      </div>



    </div>


  );

}