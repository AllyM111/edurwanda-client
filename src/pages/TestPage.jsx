import { useAuth } from "../context/AuthContext";

export default function TestPage(){

const {
user,
loading,
logout
}=useAuth();


return (

<div className="min-h-screen bg-gray-900 text-white p-10">


<h1 className="text-3xl font-bold mb-6">
EduRwanda System Test
</h1>



<p>
Loading:
{
loading ? "YES" : "NO"
}
</p>



<hr className="my-5"/>



<h2 className="text-xl">
Current User
</h2>


<pre className="bg-gray-800 p-5 rounded">

{
JSON.stringify(
user,
null,
2
)
}

</pre>



<button

onClick={logout}

className="mt-5 bg-red-600 px-5 py-2 rounded"

>

Logout Test

</button>



</div>

);

}