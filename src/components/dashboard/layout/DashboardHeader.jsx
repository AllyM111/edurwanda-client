import {
FiBell,
FiSearch
} from "react-icons/fi";


import {
useAuth
} from "../../../context/AuthContext";


import {
useSettings
} from "../../../context/SettingsContext";



export default function DashboardHeader(){


const {
user
}=useAuth();


const {
settings
}=useSettings();



const today =
new Date().toLocaleDateString(
"en-US",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
);



return (


<header

className="
h-20
px-8
flex
items-center
justify-between
border-b
"

style={{


backgroundColor:
"var(--header-color)",


borderColor:
"rgba(148,163,184,.25)",


color:
"var(--text-color)"

}}


>



{/* LEFT */}


<div>


<h1

className="
text-2xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}

>


{
settings?.siteName ||
"EduRwanda"
}


</h1>



<p

className="
text-sm
"

style={{

color:
"var(--muted-color)"

}}

>

{today}

</p>


</div>







{/* SEARCH */}


<div

className="
hidden
lg:flex
items-center
w-96
px-4
py-2
rounded-xl
border
"

style={{

backgroundColor:
"var(--card-color)"

}}

>


<FiSearch/>




<input

placeholder="Search..."

className="
ml-3
flex-1
outline-none
bg-transparent
"

 />


</div>







{/* RIGHT */}



<div

className="
flex
items-center
gap-5
"

>


<button

className="
text-xl
"

>

<FiBell/>

</button>





<div

className="
text-right
"

>


<p className="font-semibold">

{user?.name}

</p>


<p

className="text-sm"

style={{

color:
"var(--primary-color)"

}}

>

{user?.role}

</p>


</div>







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
user?.name
?.charAt(0)
?.toUpperCase()
}


</div>



</div>




</header>


);


}