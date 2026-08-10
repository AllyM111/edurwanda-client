import VisitorsChart from "./VisitorsChart";
import DownloadsChart from "./DownloadsChart";


export default function DashboardCharts({
  analytics
}) {


  if(!analytics){
    return null;
  }



  return (

    <div className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-6
    ">


      <VisitorsChart

        data={
          analytics.charts?.users || []
        }

      />



      <DownloadsChart

        books={
          analytics.charts?.books || []
        }

        exams={
          analytics.charts?.exams || []
        }

      />



    </div>

  );

}