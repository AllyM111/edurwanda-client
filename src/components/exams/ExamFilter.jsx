export default function ExamFilter({

  search,
  setSearch,

  level,
  setLevel,

  subject,
  setSubject,

  year,
  setYear

}) {


  const levels = [
    "P6(PLE)",
    "Senior 3",
    "Senior 4",
    "Senior 5",
    "Senior 6",
    "TTC",
    "TVET"
  ];


  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "ICT",
    "Geography",
    "History",
    "Economics",
    "Kinyarwanda"
  ];


  const years = [
    2026,
    2025,
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017
  ];



return (

<div

className="
rounded-2xl
shadow
p-5
grid
md:grid-cols-4
gap-4
"

style={{

backgroundColor:"var(--card-color)",

border:"1px solid var(--border-color)"

}}

>



{/* SEARCH */}


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search exam title..."

className="
rounded-xl
px-4
py-3
outline-none
"

style={{

backgroundColor:"var(--background-color)",

border:"1px solid var(--border-color)",

color:"var(--text-color)"

}}

/>





{/* LEVEL */}


<select

value={level}

onChange={(e)=>setLevel(e.target.value)}

className="
rounded-xl
px-4
py-3
outline-none
"

style={{

backgroundColor:"var(--background-color)",

border:"1px solid var(--border-color)",

color:"var(--text-color)"

}}

>


<option value="">
All Levels
</option>


{

levels.map((item)=>(

<option key={item} value={item}>

{item}

</option>

))

}


</select>






{/* SUBJECT */}


<select

value={subject}

onChange={(e)=>setSubject(e.target.value)}

className="
rounded-xl
px-4
py-3
outline-none
"

style={{

backgroundColor:"var(--background-color)",

border:"1px solid var(--border-color)",

color:"var(--text-color)"

}}

>


<option value="">
All Subjects
</option>


{

subjects.map((item)=>(

<option key={item} value={item}>

{item}

</option>

))

}


</select>







{/* YEAR */}


<select

value={year}

onChange={(e)=>setYear(e.target.value)}

className="
rounded-xl
px-4
py-3
outline-none
"

style={{

backgroundColor:"var(--background-color)",

border:"1px solid(var(--border-color))",

color:"var(--text-color)"

}}

>


<option value="">
All Years
</option>


{

years.map((item)=>(

<option key={item} value={item}>

{item}

</option>

))

}


</select>





</div>

)


}