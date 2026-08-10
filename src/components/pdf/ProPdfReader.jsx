import {
  useEffect,
  useState,
  useRef
} from "react";


import {
  Document,
  Page,
  pdfjs
} from "react-pdf";


import ReaderToolbar from "./ReaderToolbar";
import ReaderControls from "./ReaderControls";
import ReaderSidebar from "./ReaderSidebar";
import PdfThumbnailSidebar from "./PdfThumbnailSidebar";
import PdfSearch from "./PdfSearch";


import {

saveProgress,
getProgress,
addBookmark,
getBookmarks,
addNote,
getNotes,
deleteBookmark,
deleteNote

} from "../../services/readerService";


import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";



pdfjs.GlobalWorkerOptions.workerSrc =
`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;





export default function ProPdfReader({

fileUrl,

bookId,

type="book"

}){


const readerRef = useRef();

const pageRefs = useRef({});

const saveTimer = useRef();


// UNIQUE READER ID

const readerId =
`${type}-${bookId}`;



const [numPages,setNumPages]=useState(0);

const [page,setPage]=useState(1);

const [scale,setScale]=useState(1.2);

const [loading,setLoading]=useState(true);

const [error,setError]=useState(false);

const [fullscreen,setFullscreen]=useState(false);


const [bookmarks,setBookmarks]=useState([]);

const [notes,setNotes]=useState([]);


const [sidebarOpen,setSidebarOpen]=useState(false);

const [showThumbnails,setShowThumbnails]=useState(true);

const [dark,setDark]=useState(false);

const [note,setNote]=useState("");

const [searchResults,setSearchResults]=useState([]);





// ============================
// LOAD READER DATA
// ============================


useEffect(()=>{


async function load(){


try{


const progress =
await getProgress(readerId);



if(progress?.page){

setPage(progress.page);

}



setBookmarks(

await getBookmarks(readerId) || []

);



setNotes(

await getNotes(readerId) || []

);



}

catch(error){

console.log(
"READER LOAD ERROR",
error
);

}



}



if(readerId){

load();

}



},[readerId]);








// ============================
// PDF SUCCESS
// ============================


function onLoadSuccess(pdf){


setNumPages(
pdf.numPages
);


setLoading(false);


}







// ============================
// SAVE PROGRESS
// ============================


function updateProgress(current){


setPage(current);



clearTimeout(
saveTimer.current
);



saveTimer.current = setTimeout(()=>{


saveProgress({

bookId:readerId,

page:current,

progress:

Math.round(
(current / numPages)*100
)

});



},500);



}









useEffect(()=>{


if(!numPages)
return;



const observer =

new IntersectionObserver(

entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


const current =
Number(
entry.target.dataset.page
);



if(current){

updateProgress(current);

}



}


});


},

{
threshold:0.5
}

);





Object.values(pageRefs.current)

.forEach(el=>{

if(el)

observer.observe(el);

});





return ()=>observer.disconnect();



},[numPages]);









// ============================
// SEARCH
// ============================


async function searchPDF(keyword){


if(!keyword.trim()){

setSearchResults([]);

return;

}


try{


const pdf =
await pdfjs
.getDocument(fileUrl)
.promise;



let results=[];



for(
let i=1;
i<=pdf.numPages;
i++
){


const pdfPage =
await pdf.getPage(i);



const content =
await pdfPage.getTextContent();



const text =
content.items
.map(item=>item.str)
.join(" ");



if(
text
.toLowerCase()
.includes(
keyword.toLowerCase()
)

){

results.push(i);

}


}



setSearchResults(results);



}
catch(error){

console.log(
"SEARCH ERROR",
error
);


}


}









// ============================
// ZOOM
// ============================


function zoomIn(){

setScale(
s=>s+0.2
);

}



function zoomOut(){

setScale(

s=>Math.max(
0.6,
s-0.2
)

);

}









// ============================
// BOOKMARK
// ============================


async function bookmark(){


const data =
await addBookmark({

bookId:readerId,

page

});



setBookmarks(

prev=>[
...prev,
data
]

);


}




async function removeBookmark(id){


await deleteBookmark(id);


setBookmarks(

prev=>

prev.filter(
item=>item.id!==id
)

);


}








// ============================
// NOTES
// ============================


async function saveReaderNote(){


if(!note.trim())
return;



const data =
await addNote({

bookId:readerId,

page,

content:note

});



setNotes(

prev=>[
...prev,
data
]

);



setNote("");



}






async function removeNote(id){


await deleteNote(id);



setNotes(

prev=>

prev.filter(
item=>item.id!==id
)

);


}








// ============================
// FULLSCREEN
// ============================


function toggleFullscreen(){


if(!fullscreen){

readerRef.current?.requestFullscreen();

}
else{

document.exitFullscreen();

}



setFullscreen(!fullscreen);



}








function goToPage(number){


if(
number<1 ||
number>numPages
)
return;



pageRefs.current[number]
?.scrollIntoView({

behavior:"smooth",

block:"start"

});


}









return (

<div

ref={readerRef}

className={

dark

?

"bg-black text-white h-full relative"

:

"bg-gray-100 h-full relative"

}

>


<ReaderToolbar

title={
type==="exam"
?
"EduRwanda Exam Reader"
:
"EduRwanda Book Reader"
}

page={page}

numPages={numPages}

zoomIn={zoomIn}

zoomOut={zoomOut}

fullscreen={toggleFullscreen}

bookmark={bookmark}

openNotes={()=>setSidebarOpen(true)}

darkMode={()=>setDark(!dark)}

toggleThumbnails={()=>setShowThumbnails(!showThumbnails)}

/>





<PdfSearch

onSearch={searchPDF}

/>





{
searchResults.length>0 &&

<div className="bg-white text-black p-3">

<h3 className="font-bold">
Search Results
</h3>


{
searchResults.map(item=>(

<button

key={item}

onClick={()=>goToPage(item)}

className="block text-blue-600"

>

Page {item}

</button>


))

}


</div>

}







<div className="flex h-[75vh]">


{
showThumbnails &&

<PdfThumbnailSidebar

fileUrl={fileUrl}

numPages={numPages}

currentPage={page}

goToPage={goToPage}

/>

}




<div className="flex-1 overflow-auto flex justify-center">


{
loading &&
<p>
Loading PDF...
</p>
}



{
error &&
<p className="text-red-600">
PDF failed
</p>
}





<Document

file={{
url:fileUrl
}}

onLoadSuccess={onLoadSuccess}

onLoadError={()=>setError(true)}

>


{

Array.from(

new Array(numPages),

(_,index)=>(


<div

key={index}

data-page={index+1}

ref={el=>

pageRefs.current[index+1]=el

}

className="mb-10"

>


<Page

pageNumber={index+1}

scale={scale}

renderTextLayer

renderAnnotationLayer

/>



</div>


)

)

}



</Document>



</div>



</div>







<textarea

value={note}

onChange={
e=>setNote(e.target.value)
}

placeholder="Write note..."

className="w-full border p-3 text-black"

/>



<button

onClick={saveReaderNote}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Save Note

</button>






<ReaderControls

page={page}

numPages={numPages}

previousPage={()=>goToPage(page-1)}

nextPage={()=>goToPage(page+1)}

/>






<ReaderSidebar

open={sidebarOpen}

close={()=>setSidebarOpen(false)}

bookmarks={bookmarks}

notes={notes}

deleteBookmark={removeBookmark}

deleteNote={removeNote}

goToPage={goToPage}

/>




</div>


);


}