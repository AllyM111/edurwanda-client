export default function About(){


return (

<div

className="
min-h-screen
py-20
"

style={{

background:"var(--background-color)"

}}

>


<div className="max-w-7xl mx-auto px-6">





{/* ============================
        HERO
============================ */}


<section className="text-center mb-20">


<h1

className="
text-5xl
font-extrabold
mb-6
"

style={{

color:"var(--primary-color)"

}}

>

About EduRwanda

</h1>




<p

className="
text-xl
max-w-4xl
mx-auto
leading-relaxed
"

style={{

color:"var(--muted-color)"

}}

>

EduRwanda is a digital learning platform
created to help Rwandan students access
books, national examinations, learning
resources, and educational content in one
simple and modern platform.

</p>



</section>







{/* ============================
        WHAT IS EDURWANDA
============================ */}



<section

className="
grid
lg:grid-cols-2
gap-10
mb-20
"

>


<div

className="
rounded-3xl
p-8
shadow-lg
"

style={{

background:"var(--card-color)"

}}

>


<h2

className="
text-3xl
font-bold
mb-5
"

style={{

color:"var(--primary-color)"

}}

>

What is EduRwanda?

</h2>



<p

className="leading-relaxed"

>

EduRwanda provides students with easy
access to educational materials including
student books, past national examinations,
and technology learning resources.

Our goal is to reduce barriers to learning
by bringing useful education resources
online for students across Rwanda.

</p>



</div>





<div

className="
rounded-3xl
p-8
shadow-lg
"

style={{

background:"var(--card-color)"

}}

>


<h2

className="
text-3xl
font-bold
mb-5
"

style={{

color:"var(--primary-color)"

}}

>

Our Mission

</h2>



<p

className="leading-relaxed"

>

To empower students through accessible,
quality, and digital education resources
that support learning, preparation, and
academic success.

</p>



</div>



</section>









{/* ============================
        VISION
============================ */}



<section

className="
rounded-3xl
p-10
mb-20
text-center
"

style={{

background:"var(--primary-color)",

color:"white"

}}

>


<h2

className="
text-3xl
font-bold
mb-5
"

>

Our Vision

</h2>



<p

className="
max-w-3xl
mx-auto
text-lg
"

>

To become Rwanda's trusted digital
education platform where every student
can discover knowledge, practice skills,
and achieve success.

</p>



</section>









{/* ============================
        WHY EDURWANDA
============================ */}



<section className="mb-20">


<h2

className="
text-4xl
font-bold
text-center
mb-10
"

style={{

color:"var(--primary-color)"

}}

>

Why Choose EduRwanda?

</h2>



<div

className="
grid
md:grid-cols-3
gap-8
"

>



<div

className="
rounded-2xl
p-8
text-center
shadow-lg
"

style={{

background:"var(--card-color)"

}}

>

<div className="text-5xl mb-5">

📚

</div>


<h3 className="text-xl font-bold mb-3">

Student Books

</h3>


<p>

Access learning materials for different
levels and subjects.

</p>


</div>





<div

className="
rounded-2xl
p-8
text-center
shadow-lg
"

style={{

background:"var(--card-color)"

}}

>


<div className="text-5xl mb-5">

📝

</div>


<h3 className="text-xl font-bold mb-3">

Past Exams

</h3>


<p>

Practice national examinations and prepare
for success.

</p>


</div>






<div

className="
rounded-2xl
p-8
text-center
shadow-lg
"

style={{

background:"var(--card-color)"

}}

>


<div className="text-5xl mb-5">

💻

</div>


<h3 className="text-xl font-bold mb-3">

Technology Learning

</h3>


<p>

Learn programming, cybersecurity, and
modern digital skills.

</p>


</div>



</div>


</section>










{/* ============================
        CALL TO ACTION
============================ */}



<section

className="
text-center
rounded-3xl
p-12
"

style={{

background:"var(--card-color)"

}}

>


<h2

className="
text-3xl
font-bold
mb-5
"

>

Start Learning Today 🚀

</h2>



<p className="mb-8">

Explore books, exams, and educational
content available on EduRwanda.

</p>



<a

href="/books"

className="
inline-block
px-8
py-3
rounded-xl
text-white
font-bold
"

style={{

background:"var(--primary-color)"

}}

>

Explore Resources

</a>



</section>




</div>


</div>


);


}