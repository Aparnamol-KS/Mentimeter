import { useState } from "react";
import axios from "axios";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", option1: "", option2: "", option3: "", option4: "", answer: "" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setpopupMsg] = useState('')

  const addQn = () =>
    setQuestions([
      ...questions,
      { question: "", option1: "", option2: "", option3: "", option4: "", answer: "" },
    ]);

  const updateQn = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  function handleSubmit() {
    const quizData = { title, questions };

    axios
      .post(
        "http://localhost:3000/admin/create-quiz",
        {
          title: quizData.title,
          questions: quizData.questions,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        setShowPopup(true);
        setpopupMsg("Quiz added successfully!!")
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setpopupMsg('User not found!!')
        } else if (err.response?.status === 403) {
          setpopupMsg("You are not authorized to add quizzes.")
        } else if (err.response?.status == 201) {
          setpopupMsg("Quiz added successfully!!")
        } else if (err.response?.status == 500) {
          setpopupMsg("Internal Server Error")
        }
      });
  }

  const handleOkClick = () => {
    setShowPopup(false);
    setpopupMsg("")
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Montserrat'] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Quiz</h1>

        {/* Title input */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <p className="text-xl font-semibold mb-4">Question {index + 1}</p>

              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => updateQn(index, "question", e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Option 1"
                value={q.option1}
                onChange={(e) => updateQn(index, "option1", e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Option 2"
                value={q.option2}
                onChange={(e) => updateQn(index, "option2", e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Option 3"
                value={q.option3}
                onChange={(e) => updateQn(index, "option3", e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Option 4"
                value={q.option4}
                onChange={(e) => updateQn(index, "option4", e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => updateQn(index, "answer", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={addQn}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow transition"
          >
            + Add Question
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold shadow transition"
          >
            Submit
          </button>
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">{popupMsg}</h2>
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

export default CreateQuiz;
