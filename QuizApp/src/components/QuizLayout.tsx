import Question from "./Question";
import SideBar from "./SideBar";

function QuizLayout() {
    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex flex-col text-nowrap max-w-[10rem] items-center justify-center">
                <Question/>
            </div>
        </div>
    )
}

export default QuizLayout