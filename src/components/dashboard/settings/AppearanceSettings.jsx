export default function AppearanceSettings({
  settings,
  onChange
}) {


return (

<div className="bg-[var(--card-color)]">


<h2 className="text-xl font-semibold mb-6">
Appearance
</h2>



<div className="grid md:grid-cols-2 gap-6">



<div>

<label className="block mb-2">
Theme
</label>


<select

value={
settings.theme
}

onChange={
(e)=>
onChange(
"theme",
e.target.value.toLowerCase()
)
}

className="w-full bg-gray-800 rounded-lg p-3"

>


<option value="dark">
Dark
</option>


<option value="light">
Light
</option>


</select>


</div>






<div>

<label className="block mb-2">
Primary Color
</label>



<select

value={
settings.primaryColor
}

onChange={
(e)=>
onChange(
"primaryColor",
e.target.value
)
}


className="w-full bg-gray-800 rounded-lg p-3"

>


<option value="blue">
Blue
</option>

<option value="green">
Green
</option>

<option value="purple">
Purple
</option>

<option value="red">
Red
</option>

<option value="orange">
Orange
</option>

<option value="yellow">
Yellow
</option>

<option value="gray">
Gray
</option>



</select>


</div>


</div>


</div>

);


}