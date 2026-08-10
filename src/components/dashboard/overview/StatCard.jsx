export default function StatCard({

  title,

  value

}) {


  return (

    <div

      className="
      rounded-2xl
      p-6
      border
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      "

      style={{


        backgroundColor:
        "var(--card-color)",


        color:
        "var(--text-color)",


        borderColor:
        "rgba(148,163,184,0.25)"


      }}

    >




      {/* TITLE */}


      <p

        className="
        text-sm
        font-medium
        "

        style={{


          color:
          "var(--muted-color)"


        }}

      >

        {title}


      </p>







      {/* VALUE */}


      <h2

        className="
        text-4xl
        font-bold
        mt-3
        "

        style={{


          color:
          "var(--primary-color)"


        }}

      >

        {value}


      </h2>






    </div>


  );


}