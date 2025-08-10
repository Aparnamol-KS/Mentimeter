import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/attempt_quiz/${quizId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setQuiz(response.data);
      })
      .catch(() => {
        alert("Some error occurred!");
      });
  }, [quizId]);

  function handleChange(qId, optIndex) {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const inp_answers = Object.values(answers);

    axios
      .post(
        `http://localhost:3000/user/attempt_quiz/${quizId}`,
        { answers: inp_answers },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate(`/leaderboard/${quizId}`);
      })
      .catch(() => {
        alert("Some error occurred!");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-400 font-['Montserrat'] py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 font-['Merriweather']">
          {quiz.title || "Attempt Quiz"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {quiz.questions?.map((q, qIndex) => (
            <div key={qIndex}>
              <p className="text-lg font-medium text-gray-700 mb-3">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {[q.option1, q.option2, q.option3, q.option4].map(
                  (option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${qIndex}`}
                        value={idx + 1}
                        checked={answers[q._id] === String(idx + 1)}
                        onChange={() => handleChange(q._id, String(idx + 1))}
                        className="w-4 h-4 text-indigo-500"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttemptQuiz;
