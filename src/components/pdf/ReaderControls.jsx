import {
  useState,
  useEffect
} from "react";


import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from "react-icons/fi";





export default function ReaderControls({

page,

numPages,

previousPage,

nextPage,

goToPage

}){



const [

inputPage,

setInputPage

]=useState(page);





useEffect(()=>{


setInputPage(page);


},[page]);









function jumpPage(){


const target =
Number(inputPage);



if(

!target ||

target < 1 ||

target > numPages

){

setInputPage(page);

return;

}



goToPage(target);


}









function firstPage(){


goToPage(1);


}








function lastPage(){


goToPage(numPages);


}









return (


<div

className="
bg-white
border-t
p-3
flex
justify-center
items-center
gap-4
flex-wrap
"

>








{/* FIRST PAGE */}

<button


onClick={firstPage}



disabled={
page===1
}



className="
bg-gray-900
text-white
p-2
rounded-lg
disabled:opacity-40
"

>

<FiChevronsLeft size={22}/>


</button>









{/* PREVIOUS */}

<button


onClick={previousPage}



disabled={
page===1
}



className="
bg-gray-900
text-white
p-2
rounded-lg
disabled:opacity-40
"

>


<FiChevronLeft size={22}/>


</button>









{/* PAGE INPUT */}

<div

className="
flex
items-center
gap-2
"

>


<input


type="number"


value={inputPage}


min="1"


max={numPages}



onChange={

e=>

setInputPage(e.target.value)

}



onKeyDown={

e=>{

if(e.key==="Enter"){

jumpPage();

}

}

}



className="
border
rounded-lg
w-20
text-center
p-2
outline-none
"



/>





<span

className="
text-gray-600
"

>

/

{numPages || 0}

</span>






<button


onClick={jumpPage}



className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
"

>

Go

</button>




</div>









{/* NEXT */}

<button


onClick={nextPage}



disabled={
page===numPages
}



className="
bg-blue-600
text-white
p-2
rounded-lg
disabled:opacity-40
"

>


<FiChevronRight size={22}/>


</button>









{/* LAST */}

<button


onClick={lastPage}



disabled={
page===numPages
}



className="
bg-blue-600
text-white
p-2
rounded-lg
disabled:opacity-40
"

>


<FiChevronsRight size={22}/>


</button>








</div>



);


}