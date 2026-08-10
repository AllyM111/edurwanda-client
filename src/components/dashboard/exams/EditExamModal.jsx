import { useMemo } from "react";

import {
  examLevels,
  examYears,
} from "../../../data/examOptions";


export default function EditExamModal({

  open,

  close,

  formData,

  setFormData,

  handleUpdate,

  handleFileChange,

}) {


  if(!open)
    return null;




  const subjects = useMemo(()=>{


    const level =
      examLevels.find(
        (item)=>
        item.name === formData.level
      );


    return level
      ? level.subjects
      : [];


  },[
    formData.level
  ]);







  const handleChange=(e)=>{


    const {
      name,
      value
    } = e.target;




    if(name==="level"){


      setFormData({

        ...formData,

        level:value,

        subject:""

      });


      return;

    }




    setFormData({

      ...formData,

      [name]:value

    });


  };









return (


<div

className="
fixed
inset-0
z-50
bg-black/50
flex
items-center
justify-center
p-6
"

>


<div

className="
w-full
max-w-3xl
rounded-2xl
shadow-xl
p-8
"

style={{

backgroundColor:
"var(--card-color)",

color:
"var(--text-color)"

}}

>



{/* HEADER */}


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
text-2xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}

>

Edit Exam

</h2>


<p

className="
text-sm
mt-1
"

style={{

color:
"var(--muted-color)"

}}

>

Update exam information

</p>


</div>




<button

onClick={close}

className="
text-2xl
"

>

×


</button>


</div>









<form

onSubmit={handleUpdate}

className="
space-y-5
"

>





<input


name="title"


value={
formData.title || ""
}


onChange={handleChange}


placeholder="Exam title"


className="
w-full
p-3
rounded-xl
border
"



/>








<select

name="level"

value={
formData.level || ""
}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

>


<option value="">

Select Level

</option>


{

examLevels.map((level)=>(


<option

key={level.name}

value={level.name}

>

{level.name}

</option>


))

}


</select>









<select

name="subject"

value={
formData.subject || ""
}

onChange={handleChange}

disabled={!formData.level}

className="
w-full
p-3
rounded-xl
border
"

>


<option value="">

Select Subject

</option>


{

subjects.map((subject)=>(


<option

key={subject}

value={subject}

>

{subject}

</option>


))

}


</select>









<select

name="year"

value={
formData.year || ""
}

onChange={handleChange}

className="
w-full
p-3
rounded-xl
border
"

>


<option value="">

Select Year

</option>


{

examYears.map((year)=>(


<option

key={year}

value={year}

>

{year}

</option>


))

}


</select>









<textarea


name="description"


rows="4"


value={
formData.description || ""
}


onChange={handleChange}


placeholder="Description"


className="
w-full
p-3
rounded-xl
border
"



/>









<div

className="
grid
md:grid-cols-2
gap-5
"

>


<div>


<label className="
block
mb-2
font-medium
">

Replace Questions PDF

</label>


<input

type="file"

accept="application/pdf"

name="pdf"

onChange={handleFileChange}

/>


</div>








<div>


<label className="
block
mb-2
font-medium
">

Replace Answers PDF

</label>


<input

type="file"

accept="application/pdf"

name="answersPdf"

onChange={handleFileChange}

/>


</div>


</div>









<div

className="
flex
justify-end
gap-4
pt-5
"

>


<button


type="button"


onClick={close}


className="
px-6
py-3
rounded-xl
border
"

>

Cancel

</button>







<button


type="submit"


className="
px-8
py-3
rounded-xl
text-white
"

style={{

backgroundColor:
"var(--primary-color)"

}}

>

Save Changes

</button>



</div>






</form>






</div>


</div>


);


}