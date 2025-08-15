import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ViewAllLeaderBoard() {
    const navigate = useNavigate();
    const [leaderboards, setLeaderboards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/leaderboard", {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => setLeaderboards(res.data))
            .catch(() => alert("Failed to fetch leaderboards"));

        axios
            .get("http://localhost:3000/user/view_quiz", {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => setQuizzes(res.data))
            .catch(() => alert("Failed to fetch quizzes"));
    }, []);

    function getQuizTitle(id) {
        const quiz = quizzes.find((q) => q._id === id);
        return quiz ? quiz.title : "Unknown Quiz";
    }

    function handleView(quizId){
        navigate(`/leaderboard/${quizId}`)
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-white font-['Merriweather']">
                Leaderboards
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
                {leaderboards.length === 0 ? (
                    <p className="col-span-full text-center text-gray-400">
                        No leaderboards found.
                    </p>
                ) : (
                    leaderboards.map((lb) => (
                        <div
                            key={lb.quizId} 
                            className="bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-xl p-8 flex flex-col transform transition-transform hover:scale-[1.03]"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-2xl font-bold text-white border-b border-gray-600 pb-2">
                                    {getQuizTitle(lb.quizId)}
                                </h2>
                                    <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-md font-semibold cursor-pointer" onClick={()=>handleView(lb.quizId)}>view</button>
                                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-semibold tracking-wide select-none">
                                    {lb.attendees.length} Attendee{lb.attendees.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            {lb.attendees.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-3 overflow-auto max-h-72 pr-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 bg-gray-800 rounded-xl p-4 shadow-inner">
                                    {lb.attendees
                                        .sort((a, b) => b.score - a.score)
                                        .map((attendee, idx) => (
                                            <li
                                                key={idx}
                                                className="flex justify-between text-gray-200 rounded-md p-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-md hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-colors cursor-default select-none"
                                            >
                                                <span className="font-semibold">{attendee.username}</span>
                                                <span className="text-indigo-400 font-mono font-semibold text-lg">{attendee.score} pts</span>
                                                
                                            </li>
                                        ))}
                                </ol>
                            ) : (
                                <p className="text-gray-400 mt-4 italic">No attendees yet.</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ViewAllLeaderBoard;
