import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAllQuizesAdmin() {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popMsg, setPopUpMsg] = useState('')
    const [refresh, setRefresh] = useState(false); 

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
    }, [refresh]);

    function edit(quiz_id) {
        navigate(`edit/${quiz_id}`);
    }

    function deleteQuiz(quiz_id) {
        axios.delete('http://localhost:3000/admin/deleteQuiz/' + quiz_id, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(() => {
            setShowPopup(true);
            setPopUpMsg("Quiz deleted successfully!")
            setRefresh(prev => !prev); 
        }).catch(err => {
            if (err.response?.status === 401) {
                setpopupMsg('User not found!!')
            } else if (err.response?.status === 403) {
                setpopupMsg("You are not authorized to delete quizzes.")
            } else if (err.response?.status == 200) {
                setpopupMsg("Quiz deleted successfully!!")
            } else if (err.response?.status == 500) {
                setpopupMsg("Internal Server Error")
            } else if (err.response?.status == 404) {
                setpopupMsg("Quiz not found!")
            }
        })
    }

    const handleOkClick = () => {
        setShowPopup(false);
        setPopUpMsg("")
        navigate("/admin/dashboard");
    };
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
                                <i className="fa-solid fa-pen-to-square text-xl"></i>
  
                            </button>
                            <button
                                onClick={() => deleteQuiz(q._id)}
                                className="ml-5 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                                <i className="fa-solid fa-trash text-xl"></i>   
                            </button>
                        </div>
                    ))}
                </div>

                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center border border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">{popMsg}</h2>
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

export default ViewAllQuizesAdmin;


