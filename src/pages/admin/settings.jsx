import {
  useEffect,
  useState
} from "react";


import GeneralSettings from "../../components/dashboard/settings/GeneralSettings";
import AppearanceSettings from "../../components/dashboard/settings/AppearanceSettings";
import SecuritySettings from "../../components/dashboard/settings/SecuritySettings";
import SystemSettings from "../../components/dashboard/settings/SystemSettings";
import SaveSettingsButton from "../../components/dashboard/settings/SaveSettingsButton";


import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";






export default function Settings() {




const [
settings,
setSettings
] = useState(null);



const [
loading,
setLoading
] = useState(true);



const [
saving,
setSaving
] = useState(false);









// =================================
// LOAD SETTINGS
// =================================


useEffect(()=>{


loadSettings();


},[]);







const loadSettings = async()=>{


try{


const data =
await getSettings();



setSettings(data);



}
catch(error){


console.error(
"LOAD SETTINGS ERROR:",
error
);


}
finally{


setLoading(false);


}



};










// =================================
// CHANGE SETTINGS
// =================================


const handleChange = (
field,
value
)=>{


setSettings(prev=>({


...prev,


[field]:value


}));



};









// =================================
// SAVE SETTINGS
// =================================


const handleSave = async()=>{


try{


setSaving(true);



await updateSettings(
settings
);



alert(
"Settings saved successfully"
);



}
catch(error){


console.error(
"SAVE SETTINGS ERROR:",
error
);



alert(
"Failed to save settings"
);



}
finally{


setSaving(false);


}



};









if(loading){


return (

<div

className="p-6"

style={{

color:
"var(--text-color)"

}}

>

Loading settings...

</div>


);


}









return (


<div

className="
p-6
space-y-6
"

style={{

backgroundColor:
"var(--background-color)",

color:
"var(--text-color)"

}}

>








{/* HEADER */}



<div>


<h1

className="
text-3xl
font-bold
"

style={{

color:
"var(--primary-color)"

}}

>

Settings

</h1>



<p

className="
mt-2
"

style={{

color:
"var(--muted-color)"

}}

>

Configure your EduRwanda platform settings

</p>


</div>









{/* GENERAL SETTINGS */}



<div

className="
rounded-xl
border
shadow-md
p-5
"

style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}

>


<GeneralSettings

settings={settings}

onChange={handleChange}

/>


</div>









{/* APPEARANCE */}



<div

className="
rounded-xl
border
shadow-md
p-5
"

style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}

>


<AppearanceSettings

settings={settings}

onChange={handleChange}

/>


</div>









{/* SECURITY */}



<div

className="
rounded-xl
border
shadow-md
p-5
"

style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}

>


<SecuritySettings

settings={settings}

onChange={handleChange}

/>


</div>









{/* SYSTEM */}



<div

className="
rounded-xl
border
shadow-md
p-5
"

style={{

backgroundColor:
"var(--card-color)",


borderColor:
"var(--muted-color)"

}}

>


<SystemSettings

settings={settings}

onChange={handleChange}

/>


</div>









{/* SAVE BUTTON */}



<div

className="
flex
justify-end
"

>


<SaveSettingsButton

onSave={handleSave}

saving={saving}

/>


</div>








</div>


);


}