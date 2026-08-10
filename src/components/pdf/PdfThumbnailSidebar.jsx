import {
  useEffect,
  useState
} from "react";


import {
  Document,
  Page
} from "react-pdf";





export default function PdfThumbnailSidebar({

fileUrl,

numPages,

currentPage,

goToPage

}){



const [

loaded,

setLoaded

]=useState(false);







return (


<div

className="
w-40
bg-gray-200
border-r
overflow-y-auto
p-3
hidden
lg:block
"

>



<h3

className="
font-bold
mb-3
text-sm
"

>

Pages

</h3>







<Document


file={{

url:fileUrl

}}



onLoadSuccess={()=>setLoaded(true)}

>






{

loaded &&

Array.from(

new Array(numPages),

(_,index)=>(


<button


key={index}



onClick={()=>goToPage(index+1)}



className={

`

mb-3
w-full
rounded
overflow-hidden
border
transition

${

currentPage === index+1

?

"border-blue-600 shadow-lg"

:

"border-gray-300"

}

`

}



>





<Page


pageNumber={index+1}


width={110}



renderTextLayer={false}


renderAnnotationLayer={false}



/>





<div

className="
text-center
text-xs
py-1
bg-white
"

>


{index+1}


</div>





</button>


)

)

}





</Document>





</div>



);


}