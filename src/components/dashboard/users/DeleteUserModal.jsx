export default function DeleteUserModal({
user,
onClose,
onConfirm
}){


if(!user)
return null;



return (

<div
className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
>


<div
className="
bg-gray-900
text-white
p-6
rounded-xl
max-w-md
w-full
"
>


<h2 className="
text-xl
font-bold
mb-4
">

Delete User

</h2>




<p className="text-gray-300 mb-6">

Are you sure you want to delete:

<br/>

<b>
{user.name}
</b>

?

</p>






<div className="
flex
justify-end
gap-3
">


<button

onClick={onClose}

className="
bg-gray-700
px-4
py-2
rounded-lg
"

>

Cancel

</button>





<button

onClick={()=>
onConfirm(user.id)
}

className="
bg-red-600
px-4
py-2
rounded-lg
"

>

Delete

</button>



</div>




</div>


</div>


);


}