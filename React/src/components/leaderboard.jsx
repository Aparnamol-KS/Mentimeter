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
    <div className="min-h-screen bg-gray-900 text-white font-['Montserrat'] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Leaderboard</h2>

        {leaderBoard.length > 0 ? (
          <div className="space-y-4">
            {leaderBoard.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition-shadow"
              >
                <span className="text-lg font-semibold">
                  {index + 1}. {entry.username}
                </span>
                <span className="text-indigo-400 font-mono font-semibold text-lg">
                  {entry.score}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No entries found yet.</p>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
