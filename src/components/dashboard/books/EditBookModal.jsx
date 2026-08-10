import { useState } from "react";


export default function EditBookModal({

open,
close,
book,
onUpdate

}){


const [form,setForm]=useState({

title: book?.title || "",
author: book?.author || "",
category: book?.category || "",
level: book?.level || "",
subject: book?.subject || "",
description: book?.description || "",
year: book?.year || ""

});



if(!open || !book)
return null;



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const handleSubmit=(e)=>{

e.preventDefault();


onUpdate({

...book,

...form,

year:
form.year
?
Number(form.year)
:null


});


};






return (

<div

className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"

>


<div

className="
theme-card
rounded-2xl
p-6
w-full
max-w-xl
"

>


<h2

className="
text-2xl
font-bold
mb-5
"

>

Edit Book

</h2>





<form

onSubmit={handleSubmit}

className="space-y-4"

>


<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Title"

className="
w-full
border
p-3
rounded-xl
"

/>




<input

name="author"

value={form.author}

onChange={handleChange}

placeholder="Author"

className="
w-full
border
p-3
rounded-xl
"

/>





<input

name="category"

value={form.category}

onChange={handleChange}

placeholder="Category"

className="
w-full
border
p-3
rounded-xl
"

/>





<input

name="level"

value={form.level}

onChange={handleChange}

placeholder="Level"

className="
w-full
border
p-3
rounded-xl
"

/>





<input

name="subject"

value={form.subject}

onChange={handleChange}

placeholder="Subject"

className="
w-full
border
p-3
rounded-xl
"

/>






<input

name="year"

value={form.year}

onChange={handleChange}

placeholder="Year"

className="
w-full
border
p-3
rounded-xl
"

/>






<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

className="
w-full
border
p-3
rounded-xl
h-28
"

/>







<div className="flex gap-3">


<button

className="
bg-blue-600
text-white
px-5
py-2
rounded-xl
"

>

Save Changes

</button>




<button

type="button"

onClick={close}

className="
bg-gray-500
text-white
px-5
py-2
rounded-xl
"

>

Cancel

</button>


</div>



</form>



</div>



</div>


);


}