import {
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiBookmark,
  FiFileText,
  FiMoon,
  FiSun,
  FiGrid,
  FiDownload
} from "react-icons/fi";





export default function ReaderToolbar({

title,

page,

numPages,

zoomIn,

zoomOut,

fullscreen,

bookmark,

openNotes,

darkMode,

toggleThumbnails,

downloadPdf,

dark,

scale

}){





return (


<div

className="
bg-gray-900
text-white
flex
items-center
justify-between
p-3
gap-4
flex-wrap
"

>









{/* LEFT SIDE */}

<div

className="
flex
items-center
gap-3
"

>



<h2

className="
font-bold
hidden
md:block
"

>

{title}

</h2>





<button


onClick={zoomOut}



className="
hover:bg-gray-700
p-2
rounded
"

title="Zoom Out"

>

<FiZoomOut size={20}/>

</button>








<div

className="
text-sm
min-w-[60px]
text-center
"

>

{

scale

?

`${Math.round(scale*100)}%`

:

"100%"

}


</div>








<button


onClick={zoomIn}



className="
hover:bg-gray-700
p-2
rounded
"

title="Zoom In"

>


<FiZoomIn size={20}/>


</button>







<button


onClick={toggleThumbnails}



className="
hover:bg-gray-700
p-2
rounded
"

title="Toggle thumbnails"

>


<FiGrid size={20}/>


</button>







</div>









{/* CENTER PAGE INFO */}

<div

className="
font-semibold
"

>


Page {page} / {numPages || "-"}


</div>









{/* RIGHT SIDE */}

<div

className="
flex
items-center
gap-3
"

>







<button


onClick={bookmark}



className="
hover:bg-gray-700
p-2
rounded
"

title="Save bookmark"

>


<FiBookmark size={20}/>


</button>









<button


onClick={openNotes}



className="
hover:bg-gray-700
p-2
rounded
"

title="Notes"

>


<FiFileText size={20}/>


</button>









<button


onClick={darkMode}



className="
hover:bg-gray-700
p-2
rounded
"

title="Dark mode"

>


{

dark

?

<FiSun size={20}/>

:

<FiMoon size={20}/>

}


</button>









<button


onClick={fullscreen}



className="
hover:bg-gray-700
p-2
rounded
"

title="Fullscreen"

>


<FiMaximize size={20}/>


</button>









{

downloadPdf &&


<button


onClick={downloadPdf}



className="
bg-green-600
hover:bg-green-700
p-2
rounded
"

title="Download PDF"

>


<FiDownload size={20}/>


</button>


}




</div>







</div>



);


}