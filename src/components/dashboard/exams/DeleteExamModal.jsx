export default function DeleteExamModal({
exam,
onClose,
onConfirm
}){


return (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">


<div className="bg-white p-6 rounded">


<h2 className="font-bold text-xl mb-4">

Delete {exam.title}?

</h2>


<button

onClick={onConfirm}

className="bg-red-600 text-white px-4 py-2 rounded"

>

Delete

</button>



<button

onClick={onClose}

className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"

>

Cancel

</button>


</div>


</div>


);


}