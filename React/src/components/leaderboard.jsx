import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

function LeaderBoard() {
    const [leaderBoard, setLeaderBoard] = useState([]);
    const { quizId } = useParams();
    useEffect(() => {

        axios.get('http://localhost:3000/leaderboard/' + quizId, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(function (response) {
            setLeaderBoard(response.data)
        })
    }, [])


    return (
        <div>
            <h2>Leaderboard</h2>
            {leaderBoard.length > 0 ? (
                leaderBoard.map((q, index) => (
                    <div key={index}>
                        <h3>{index + 1}. {q.username} ---- {q.score}</h3>
                    </div>
                ))
            ) : (
                <p>No entries found yet.</p>
            )}
        </div>
    );

}

export default LeaderBoard