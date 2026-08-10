import {
  useState
} from "react";


import {
  FiSearch,
  FiX
} from "react-icons/fi";





export default function PdfSearch({

onSearch

}){



const [
keyword,
setKeyword
]=useState("");



const [
searching,
setSearching
]=useState(false);







async function handleSearch(){


if(
!keyword.trim()
)
return;



try{


setSearching(true);


await onSearch(
keyword.trim()
);


}
finally{


setSearching(false);


}



}









function clearSearch(){


setKeyword("");


onSearch("");



}









return (


<div

className="
bg-white
border-b
p-3
flex
gap-3
items-center
"

>








<div

className="
flex
items-center
flex-1
border
rounded-lg
px-3
py-2
"

>



<FiSearch

className="
text-gray-500
"

/>





<input


value={keyword}


onChange={
e=>
setKeyword(e.target.value)
}



onKeyDown={
e=>{

if(e.key==="Enter"){

handleSearch();

}

}

}



placeholder="Search inside PDF..."



className="
flex-1
outline-none
ml-3
text-gray-700
"



/>









{

keyword &&


<button

onClick={clearSearch}

className="
text-gray-500
hover:text-red-500
"

>

<FiX size={20}/>

</button>


}




</div>









<button


onClick={handleSearch}



disabled={searching}



className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
hover:bg-blue-700
disabled:opacity-50
"

>


{

searching

?

"Searching..."

:

"Search"

}


</button>









</div>



);


}