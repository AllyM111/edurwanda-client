export default function DeleteBookModal({
open,
close,
book,
handleDelete
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
max-w-md
"
>


<h2
className="
text-xl
font-bold
mb-4
"
>
Delete Book?
</h2>



<p className="text-gray-600 mb-6">

Are you sure you want to delete:

<strong>
{" "}
{book?.title}

</strong>

?

</p>



<div
className="
flex
gap-4
"
>


<button

onClick={handleDelete}

className="
bg-red-600
text-white
px-5
py-2
rounded-xl
"

>

Delete

</button>



<button

onClick={close}

className="
bg-gray-200
px-5
py-2
rounded-xl
"

>

Cancel

</button>



</div>



</div>


</div>

);

}