import { useQuizStore } from "../store/useQuizStore"

function Question() {
    const { questions, currentQuestion, selectAnswer, answer, nextQuestion, prevQuestion, resetQuiz, score, showScore } = useQuizStore();

    if (showScore) {
        return (
            <div className="w-3/4 p-6">
                <div>
                <h2 className="text-2xl font-semibold">Your Score</h2>
                <p className="mt-4 text-lg">Your socred {score} out of {questions.length}</p>
                </div>
                    <button 
                    className="cursor-pointer mt-6 px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={resetQuiz}>Restart Quiz</button>
            </div>
        )
    }


    const handleSelect = (index: number) => {
        selectAnswer(index)
    }

    const handleSubmit = () => {
        nextQuestion();
    }

    const question = questions[currentQuestion];
    const currentAnswer = answer[currentQuestion];

    return (
        <div className="w-3/4 p-6">
            <h3 className="text-2xl font-semibold ">{question.question}</h3>
            <div className="mt-4">
                {question.options.map((option, index) => (
                    <div key={index} className="my-4">
                        <label className="flex items-center">
                            <input type="radio" name={`question-${currentQuestion}`} checked={currentAnswer === index}
                                className="mr-2"
                                onChange={() => handleSelect(index)}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
                <div>
                    {currentQuestion > 0 && (
                        <button
                            onClick={prevQuestion}
                            className="cursor-pointer mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Previous</button>
                    )}
                </div>

                {currentQuestion < questions.length - 1 ? (
                    <button
                        onClick={nextQuestion}
                        className="cursor-pointer mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >Next</button>
                ) : (
                    <button onClick={handleSubmit} className="cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-600">Submit</button>
                )}
            </div>

        </div>
    )
}

export default Question