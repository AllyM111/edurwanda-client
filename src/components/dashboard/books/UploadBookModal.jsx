import BookForm from "./BookForm";


export default function UploadBookModal({

open,

close,

formData,

setFormData,

handleUpload,

handleFileChange

}){


if(!open)
return null;



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
bg-[var(--card-color)]
rounded-2xl
p-6
w-full
max-w-xl
max-h-[90vh]
overflow-y-auto
"
>


<h2
className="
text-2xl
font-bold
mb-5
"
>
Upload Book
</h2>



<BookForm

formData={formData}

setFormData={setFormData}

handleSubmit={handleUpload}

handleFileChange={handleFileChange}

buttonText="Upload Book"

/>




<button

onClick={close}

className="
mt-4
text-gray-500
hover:text-gray-800
"

>

Cancel

</button>




</div>


</div>

);

}