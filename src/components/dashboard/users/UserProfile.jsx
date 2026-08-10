import { FiUser, FiMail, FiShield, FiCalendar } from "react-icons/fi";


const UserProfile = ({
  user,
  onClose
}) => {


  if (!user) return null;



  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">


      <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 text-white">



        {/* Header */}

        <div className="flex justify-between items-center mb-6">


          <h2 className="text-2xl font-bold">

            User Profile

          </h2>


          <button

            onClick={onClose}

            className="text-gray-400 hover:text-white"

          >

            ✕

          </button>


        </div>







        {/* Avatar */}

        <div className="flex justify-center mb-6">


          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">


            <FiUser size={45}/>


          </div>


        </div>







        {/* User Info */}

        <div className="space-y-4">



          <div className="flex items-center gap-3">


            <FiUser className="text-blue-400"/>


            <div>

              <p className="text-gray-400 text-sm">

                Name

              </p>

              <p>

                {user.name}

              </p>


            </div>


          </div>






          <div className="flex items-center gap-3">


            <FiMail className="text-blue-400"/>


            <div>

              <p className="text-gray-400 text-sm">

                Email

              </p>


              <p>

                {user.email}

              </p>


            </div>


          </div>








          <div className="flex items-center gap-3">


            <FiShield className="text-blue-400"/>


            <div>

              <p className="text-gray-400 text-sm">

                Role

              </p>


              <span

                className={`px-3 py-1 rounded-full text-sm ${
                  
                  user.role === "ADMIN"

                  ? "bg-red-600"

                  : "bg-blue-600"

                }`}

              >

                {user.role}

              </span>


            </div>


          </div>









          <div className="flex items-center gap-3">


            <FiCalendar className="text-blue-400"/>


            <div>

              <p className="text-gray-400 text-sm">

                Joined

              </p>


              <p>

                {
                  new Date(
                    user.createdAt
                  ).toLocaleDateString()
                }

              </p>


            </div>


          </div>



        </div>







      </div>


    </div>

  );

};



export default UserProfile;