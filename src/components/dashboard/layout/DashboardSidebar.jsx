import {
  NavLink
} from "react-router-dom";

import {
  FaTachometerAlt,
  FaBook,
  FaFileAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaYoutube
} from "react-icons/fa";

export default function DashboardSidebar(){


const links=[

{
name:"Dashboard",
path:"/dashboard",
icon:<FaTachometerAlt/>
},

{
name:"Books",
path:"/dashboard/books",
icon:<FaBook/>
},

{
name:"Exams",
path:"/dashboard/exams",
icon:<FaFileAlt/>
},

{
name:"🎥 Media",
path:"/dashboard/media",
icon:<FaYoutube/>
},

{
name:"Users",
path:"/dashboard/users",
icon:<FaUsers/>
},

{
name:"Analytics",
path:"/dashboard/analytics",
icon:<FaChartBar/>
},

{
name:"Profile",
path:"/dashboard/profile",
icon:<FaUserCircle/>
},

{
name:"Settings",
path:"/dashboard/settings",
icon:<FaCog/>
}

];




return (

<aside

className="
w-72
min-h-screen
flex
flex-col
border-r
"

style={

{

backgroundColor:
"var(--sidebar-color)",

color:
"var(--text-color)"

}

}

>



<div

className="
p-6
border-b
"

>

<h1

className="
text-2xl
font-bold
"

style={

{

color:
"var(--primary-color)"

}

}

>

EduRwanda

</h1>

<p

style={

{

color:
"var(--muted-color)"

}

}

>

Admin Dashboard

</p>

</div>





<nav

className="
flex-1
p-4
space-y-2
"

>

{

links.map(link=>(

<NavLink

key={link.path}

to={link.path}

end={
link.path==="/dashboard"
}

className={({isActive})=>`

flex
items-center
gap-3
px-4
py-3
rounded-xl
transition

${
isActive
?
"text-white"
:
"opacity-70 hover:opacity-100"
}

`}

style={({isActive})=>(

{

backgroundColor:

isActive
?
"var(--primary-color)"
:
"transparent"

}

)}

>

{link.icon}

<span>

{link.name}

</span>

</NavLink>

))

}

</nav>



</aside>

);

}