export default function YoutubeCard({video}){


return (

<div

className="
rounded-2xl
overflow-hidden
shadow-lg
transition
hover:-translate-y-2
"

style={{

backgroundColor:"var(--card-color)",

border:"1px solid var(--border-color)"

}}

>


<div className="
aspect-video
">


<iframe

className="
w-full
h-full
"

src={video.embedUrl}

title={video.title}

allowFullScreen

/>

</div>





<div className="p-5">


<h3

className="
font-bold
text-xl
"

style={{

color:"var(--text-color)"

}}

>

{video.title}

</h3>



<p

className="
mt-2
"

style={{

color:"var(--muted-color)"

}}

>

{video.description}

</p>



<span

className="
inline-block
mt-4
px-3
py-1
rounded-full
text-sm
"

style={{

backgroundColor:"var(--primary-color)",

color:"#fff"

}}

>

{video.channel}

</span>



</div>



</div>


);


}