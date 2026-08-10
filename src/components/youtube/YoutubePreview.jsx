import { Link } from "react-router-dom";


export default function YoutubePreview(){


const channels=[


{
name:"Rwanda Lyrics",
image:"/images/youtube/rwanda-lyrics.png",
type:"rwanda-lyrics",
description:
"Rwandan music, lyrics and culture 🎵"
},



{
name:"Ally Cyber Rwanda",
image:"/images/youtube/ally-cyber-rwanda.png",
type:"ally-cyber-rwanda",
description:
"Cybersecurity, programming and technology 💻"
}



];




return(


<section

className="
py-20
"

style={{

backgroundColor:"var(--background-color)"

}}

>


<div

className="
max-w-7xl
mx-auto
px-6
"

>



<div className="text-center mb-12">


<h2

className="
text-4xl
font-bold
"

style={{

color:"var(--primary-color)"

}}

>

EduRwanda Media Hub 🎥

</h2>



<p

className="mt-4"

style={{

color:"var(--muted-color)"

}}

>

Learn, watch and discover more content from our channels.

</p>



</div>






<div

className="
grid
md:grid-cols-2
gap-8
"

>



{


channels.map((channel)=>(


<div

key={channel.type}

className="
rounded-3xl
p-8
shadow-xl
"

style={{


backgroundColor:"var(--card-color)",

border:"1px solid var(--border-color)"


}}


>



<div

className="
flex
items-center
gap-6
"


>


<img

src={channel.image}

alt={channel.name}

className="
w-24
h-24
rounded-full
object-cover
border-4
"

/>



<div>


<h3

className="
text-2xl
font-bold
"

>

{channel.name}

</h3>



<p

className="mt-2"

style={{

color:"var(--muted-color)"

}}

>

{channel.description}

</p>


</div>


</div>





<Link

to={`/youtube/${channel.type}`}

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

backgroundColor:"var(--primary-color)"

}}

>

Visit Channel →

</Link>




</div>



))


}




</div>



</div>


</section>


);


}