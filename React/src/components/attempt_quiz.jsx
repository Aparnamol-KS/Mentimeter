import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/attempt_quiz/${quizId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setQuiz(response.data);
      })
      .catch(() => alert("Some error occurred!"));
  }, [quizId]);

  function handleChange(qId, optIndex) {
    const question = quiz.questions.find((q) => q._id === qId);
    if (!question) return;

    const options = [question.option1, question.option2, question.option3, question.option4];
    const selectedOptionText = options[optIndex - 1];

    setAnswers((prev) => ({
      ...prev,
      [qId]: selectedOptionText,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const inp_answers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));


    axios
      .post(
        `http://localhost:3000/user/attempt_quiz/${quizId}`,
        { answers: inp_answers },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(() => {
        setShowPopup(true);
      })
      .catch(() => alert("Some error occurred!"));
  }
  const handleOkClick = () => {
    setShowPopup(false);
    navigate(`/leaderboard/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Montserrat'] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center font-['Merriweather']">
          {quiz.title || "Attempt Quiz"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {quiz.questions?.map((q, qIndex) => (
            <div key={q._id || qIndex} className="bg-gray-700 p-5 rounded-lg">
              <p className="text-lg font-semibold mb-4">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-3">
                {[q.option1, q.option2, q.option3, q.option4].map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q${qIndex}`}
                      value={idx + 1}
                      checked={answers[q._id] === option}
                      onChange={() => handleChange(q._id, idx + 1)}
                      className="w-5 h-5 text-indigo-500"
                    />
                    <span className="text-gray-200">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Quiz Submitted!</h2>
              <p className="text-gray-300 mb-6">
                Your submission has been evaluated.
              </p>
              <button
                onClick={handleOkClick}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold shadow"
              >
                OK
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AttemptQuiz;
