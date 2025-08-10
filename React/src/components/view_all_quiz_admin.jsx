import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAllQuizesAdmin() {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/view_quiz", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                setQuiz(response.data);
            });
    }, []);

    function edit(quiz_id) {
        navigate(`edit/${quiz_id}`);
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white font-['Montserrat'] py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Quizzes</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quiz.map((q) => (
                        <div
                            key={q._id}
                            className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-4">{q.title}</h2>
                            <button
                                onClick={() => edit(q._id)}
                                className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default ViewAllQuizesAdmin;


