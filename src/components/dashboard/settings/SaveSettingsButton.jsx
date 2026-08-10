export default function SaveSettingsButton({
  onSave,
  saving,
}) {


  return (

    <button

      onClick={onSave}

      disabled={saving}

      className="
      bg-blue-600
      hover:bg-blue-700
      px-6
      py-3
      rounded-lg
      font-semibold
      disabled:opacity-50
      "

    >

      {
        saving
        ?
        "Saving..."
        :
        "Save Changes"
      }


    </button>

  );


}