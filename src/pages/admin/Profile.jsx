import {
  useEffect,
  useState
} from "react";


import {
  getProfile,
  updateProfile,
  changePassword
} from "../../services/profileService";





export default function Profile(){



const [
profile,
setProfile
] = useState(null);



const [
loading,
setLoading
] = useState(true);



const [
message,
setMessage
] = useState("");





const [
form,
setForm
] = useState({

name:"",
email:""

});





const [
password,
setPassword
] = useState({

oldPassword:"",
newPassword:""

});







// =================================
// LOAD PROFILE
// =================================


const loadProfile = async()=>{


try{


const data =
await getProfile();



setProfile(data);



setForm({

name:data.name || "",

email:data.email || ""

});



}
catch(error){


console.log(
"PROFILE ERROR:",
error
);


}
finally{


setLoading(false);


}



};







useEffect(()=>{


loadProfile();


},[]);









// =================================
// UPDATE PROFILE
// =================================


const handleUpdate = async(e)=>{


e.preventDefault();



try{


const data =
await updateProfile(form);



setMessage(
data.message ||
"Profile updated successfully"
);



loadProfile();



}
catch(error){


console.log(error);



setMessage(
"Update failed"
);



}


};









// =================================
// CHANGE PASSWORD
// =================================


const handlePassword = async(e)=>{


e.preventDefault();



try{


const data =
await changePassword(password);



setMessage(
data.message ||
"Password changed successfully"
);




setPassword({

oldPassword:"",

newPassword:""

});




}
catch(error){


console.log(error);



setMessage(
"Password change failed"
);



}



};









if(loading){


return (

<div

className="p-6"

style={{

color:
"var(--text-color)"

}}

>

Loading profile...

</div>


);


}










return (


<div

className="
p-6
space-y-6
"

style={{

backgroundColor:
"var(--background-color)",

color:
"var(--text-color)"

}}

>







{/* HEADER */}


<div>


<h1

className="
text-3xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}

>

My Profile

</h1>


<p

className="mt-2"

style={{

color:
"var(--muted-color)"

}}

>

Manage your EduRwanda administrator account

</p>


</div>









{
message &&


<div

className="
p-3
rounded-lg
text-white
"

style={{

backgroundColor:
"var(--primary-color)"

}}

>

{message}

</div>


}









{/* ACCOUNT INFORMATION */}



<div


className="
rounded-xl
border
shadow-md
p-6
"


style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}


>


<h2

className="
text-xl
font-bold
mb-5
"

>

Account Information

</h2>






<form

onSubmit={handleUpdate}

className="
space-y-4
"

>





<input


value={
form.name
}


onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}



className="
w-full
p-3
rounded-lg
border
outline-none
"


style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


placeholder="Name"

/>








<input


value={
form.email
}


onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}



className="
w-full
p-3
rounded-lg
border
outline-none
"



style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


placeholder="Email"

/>








<button


className="
px-5
py-3
rounded-lg
text-white
font-semibold
transition
"


style={{


backgroundColor:
"var(--primary-color)"


}}


>

Update Profile

</button>






</form>



</div>













{/* PASSWORD */}



<div


className="
rounded-xl
border
shadow-md
p-6
"


style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}


>



<h2

className="
text-xl
font-bold
mb-5
"

>

Change Password

</h2>








<form

onSubmit={handlePassword}

className="
space-y-4
"

>






<input


type="password"


value={
password.oldPassword
}


onChange={(e)=>

setPassword({

...password,

oldPassword:e.target.value

})

}



className="
w-full
p-3
rounded-lg
border
outline-none
"



style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


placeholder="Current password"

/>








<input


type="password"


value={
password.newPassword
}


onChange={(e)=>

setPassword({

...password,

newPassword:e.target.value

})

}



className="
w-full
p-3
rounded-lg
border
outline-none
"



style={{


backgroundColor:
"var(--background-color)",


color:
"var(--text-color)",


borderColor:
"var(--muted-color)"


}}


placeholder="New password"

/>










<button


className="
px-5
py-3
rounded-lg
text-white
font-semibold
transition
"


style={{


backgroundColor:
"var(--primary-color)"


}}


>

change Password

</button>






</form>





</div>









</div>


);


}