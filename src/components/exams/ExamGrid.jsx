import ExamCard from "./ExamCard";


export default function ExamGrid({ exams }) {


    if (!exams || exams.length === 0) {


        return (

            <div
                className="
                text-center
                py-20
                text-gray-500
                "
            >

                No exams available 📝

            </div>

        );

    }



    return (

        <div
            className="
            grid
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            "
        >


            {
                exams.map((exam)=>(

                    <ExamCard

                        key={exam.id}

                        exam={exam}

                    />

                ))
            }


        </div>

    );


}