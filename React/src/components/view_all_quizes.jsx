import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ViewAllQuizes() {
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

    function attempt(quiz_id){
        navigate(`/attempt/${quiz_id}`)
    }


    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "cambria"
    }}>
        <h1 style={{ fontSize: "60px" }}>Quizes</h1>
        <div style={{
            display: "flex",
        }}>
            
        </div>
        {quiz.map(q =>
            <div key={q._id} style={{ padding: "20px",  width: "50%", boxShadow: "1px 2px 4px grey", margin: "10px"}} >
                <h3>{q.title}</h3>
                <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "80px", margin: "20px" }} onClick={()=>attempt(q._id)}> Attempt </button>
            </div>
        )}

    </div>

}


export default ViewAllQuizes