import { FiLock, FiUnlock } from "react-icons/fi";


export default function UserStatusButton({
  user,
  onChange
}) {


const blocked =
user.status === "BLOCKED";



return (

<button

onClick={()=>


onChange(
user,
blocked
?
"ACTIVE"
:
"BLOCKED"
)


}

className={`
flex
items-center
gap-2
px-3
py-2
rounded-lg
text-sm
font-medium

${
blocked
?
"bg-green-600 hover:bg-green-700"
:
"bg-orange-600 hover:bg-orange-700"
}

`}


>


{
blocked
?
<FiUnlock/>
:
<FiLock/>
}



{
blocked
?
"Activate"
:
"Block"
}



</button>


);


}