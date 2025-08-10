import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/leaderboard/" + quizId, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setLeaderBoard(response.data);
      });
  }, [quizId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-['Montserrat'] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-6xl font-extrabold mb-10 text-center tracking-wide font-['Merriweather'] text-indigo-400 drop-shadow-lg">
          Leaderboard
        </h2>

        {leaderBoard.length > 0 ? (
          <div className="space-y-5">
            {leaderBoard.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 rounded-2xl p-5 shadow-xs shadow-white select-none"
              >
                <span className="text-lg font-semibold">
                  <span className="text-indigo-400 mr-3">{index + 1}.</span> {entry.username}
                </span>
                <span className="text-indigo-400 font-mono font-semibold text-lg">
                  {entry.score} pts
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 italic mt-10">No entries found yet.</p>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
