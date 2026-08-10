import YoutubeCard from "./YoutubeCard";


export default function YoutubeSection({

channel

}){


return (

<section

className="
max-w-7xl
mx-auto
px-6
py-20
"

>


<div

className="
flex
justify-between
items-center
mb-8
"

>


<div>


<h2

className="
text-3xl
font-bold
"

style={{

color:"var(--primary-color)"

}}

>

{channel.title}

</h2>


<p

className="
mt-2
"

style={{

color:"var(--muted-color)"

}}

>

{channel.description}

</p>


</div>



<a

href={channel.channelUrl}

target="_blank"

rel="noreferrer"

className="
px-5
py-3
rounded-xl
text-white
font-semibold
"

style={{

backgroundColor:"var(--primary-color)"

}}

>

Subscribe

</a>



</div>





<div

className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
"

>


{

channel.videos.map(video=>(


<YoutubeCard

key={video.id}

video={video}

/>


))


}


</div>


</section>


);


}