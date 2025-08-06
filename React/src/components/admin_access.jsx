import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminMain() {

    const navigate = useNavigate(); 
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:3000/user/view_quiz', {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(function (response) {
            setQuiz(response.data)
        })
    }, [])



    function createQuiz() {
        window.location = '/admin/create_quiz'
    }

    function viewLeaderBoard(quizId){
        navigate(`/leaderboard/${quizId}`)
    }

    



    return (
        
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "cambria"
            }}>
                <h1 style={{ fontSize: "60px" }}>Your Quizes</h1>
                <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "10%", margin: "20px" }} onClick={createQuiz}>Create Quiz</button>
                <div style={{
                    display: "flex",
                }}>

                </div>
                {quiz.map(q =>
                    <div key={q._id} style={{ padding: "20px", width: "50%", boxShadow: "1px 2px 4px grey", margin: "10px" , borderRadius: "10px"}} >
                        <h2>{q.title}</h2>
                        <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "10%", margin: "20px" }} > Edit </button>
                        <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "20%", margin: "20px" }} onClick={()=>viewLeaderBoard(q._id)} > View LeaderBoard </button>
                    </div>
                )}

            </div>
    )
}

export default AdminMain