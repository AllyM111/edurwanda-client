export default function BookFilter({

search,
setSearch,

level,
setLevel,

subject,
setSubject,

year,
setYear

}){


return (

<div className="
bg-[var(--card-color)]
rounded-2xl
shadow
p-5
grid
md:grid-cols-4
gap-4
">


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search books..."

className="
border
rounded-xl
px-4
py-3
"

/>





<select

value={level}

onChange={(e)=>setLevel(e.target.value)}

className="
border
rounded-xl
px-4
py-3
"

>

<option value="">
All Levels
</option>

<option>
Senior 4
</option>

<option>
Senior 5
</option>

<option>
Senior 6
</option>


</select>







<select

value={subject}

onChange={(e)=>setSubject(e.target.value)}

className="
border
rounded-xl
px-4
py-3
"

>

<option value="">
All Subjects
</option>

<option>
Mathematics
</option>

<option>
Physics
</option>

<option>
Biology
</option>

<option>
ICT
</option>


</select>







<select

value={year}

onChange={(e)=>setYear(e.target.value)}

className="
border
rounded-xl
px-4
py-3
"

>

<option value="">
All Years
</option>

<option>
2026
</option>

<option>
2025
</option>

<option>
2024
</option>


</select>



</div>


)

}