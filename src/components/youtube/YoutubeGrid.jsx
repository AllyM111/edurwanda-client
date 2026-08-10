export default function YoutubeGrid({ videos }) {



if(!videos || videos.length === 0){


return (

<div

className="
text-center
py-10
"

style={{

color:"var(--muted-color)"

}}

>

No videos available 🎥

</div>

);


}



return (


<div

className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-8
"

>



{


videos.map((video)=>(


<div

key={video.id}

className="
rounded-2xl
overflow-hidden
shadow-lg
"

style={{

backgroundColor:"var(--card-color)",

border:"1px solid var(--border-color)"

}}

>



{/* VIDEO */}


<div

className="
aspect-video
"

>


<iframe

src={video.embedUrl}

title={video.title}

className="
w-full
h-full
"

allowFullScreen

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

/>


</div>







{/* DETAILS */}


<div

className="
p-5
"

>


<h3

className="
text-xl
font-bold
"

>

{video.title}

</h3>



<p

className="
mt-2
text-sm
"

style={{

color:"var(--muted-color)"

}}

>

{video.description}

</p>




<div

className="
mt-4
text-sm
font-semibold
"

style={{

color:"var(--primary-color)"

}}

>

{video.channel}

</div>



</div>





</div>



))


}



</div>


);


}