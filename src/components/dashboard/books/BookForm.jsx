import {
  bookTypes,
  educationLevels
} from "../../../data/bookOptions";



export default function BookForm({

formData,

setFormData,

handleSubmit,

handleFileChange,

buttonText

}){



const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};





return (

<form

onSubmit={handleSubmit}

className="space-y-4"

>



{/* BOOK TYPE */}

<div>

<label className="font-semibold">

Book Type

</label>


<select

name="type"

value={formData.type || "EDUCATION_BOOK"}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

>


{
bookTypes.map((type)=>(


<option

key={type.value}

value={type.value}

>

{type.label}

</option>


))

}


</select>


</div>








{/* TITLE */}


<input

name="title"

placeholder="Book title"

value={formData.title}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>







{/* NORMAL BOOK FIELDS */}


{

formData.type==="NORMAL_BOOK" &&

<>


<input

name="author"

placeholder="Author"

value={formData.author}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>




<input

name="category"

placeholder="Category"

value={formData.category}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>


</>

}










{/* EDUCATION BOOK FIELDS */}


{

formData.type==="EDUCATION_BOOK" &&

<>


<select

name="level"

value={formData.level}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

>


<option value="">

Select Level

</option>


{

educationLevels.map(level=>(


<option

key={level}

value={level}

>

{level}

</option>


))

}


</select>







<input

name="subject"

placeholder="Subject"

value={formData.subject}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>







<input

name="className"

placeholder="Class name"

value={formData.className}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>



</>

}







<input

name="year"

placeholder="Year"

value={formData.year}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>






<textarea

name="description"

placeholder="Description"

value={formData.description}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

/>







<label className="font-semibold">

PDF File

</label>


<input

type="file"

name="pdf"

accept=".pdf"

onChange={handleFileChange}

/>







<label className="font-semibold">

Cover Image

</label>


<input

type="file"

name="cover"

accept="image/*"

onChange={handleFileChange}

/>







<button

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
hover:bg-blue-700
"

>

{buttonText}

</button>



</form>

);


}