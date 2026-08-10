import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [error, setError] = useState("");



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    try {


      await login(form);


      navigate("/dashboard");


    } catch (err) {


      setError(
        err?.response?.data?.message ||
        "Login failed. Check credentials."
      );


    }

  };





  return (


    <div
      className="
      flex
      items-center
      justify-center
      min-h-screen
      bg-gray-900
      text-white
      "
    >


      <form

        onSubmit={handleSubmit}

        className="
        w-full
        max-w-md
        p-6
        bg-gray-800
        rounded-lg
        shadow-lg
        "

      >


        <h2 className="
        text-2xl
        font-bold
        mb-6
        text-center
        ">
          Login
        </h2>




        {error && (

          <div className="
          bg-red-500
          text-white
          p-2
          mb-4
          rounded
          ">

            {error}

          </div>

        )}






        <input

          type="email"

          name="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          className="
          w-full
          p-2
          mb-4
          rounded
          bg-gray-700
          "

          required

        />






        <input

          type="password"

          name="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          className="
          w-full
          p-2
          mb-4
          rounded
          bg-gray-700
          "

          required

        />







        <button

          type="submit"

          className="
          w-full
          
          p-2
          rounded
          "
           style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}

        >

          Login

        </button>







        <p className="
        text-sm
        mt-4
        text-center
        text-gray-400
        ">


          Don’t have an account?{" "}


          <Link

            to="/register"

            className="
            text-blue-400
            hover:text-blue-300
            font-semibold
            "

          >

            Create Account

          </Link>


        </p>





      </form>


    </div>


  );

}


export default Login;