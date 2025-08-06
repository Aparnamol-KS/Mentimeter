import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function AttemptQuiz() {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({});
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:3000/user/attempt_quiz/' + quizId, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(function (response) {
            setQuiz(response.data);
        }).catch(error => {
            alert('Some error occurred!');
        });
    }, [quizId]);

    function handleChange(qIndex, optIndex) {
        setAnswers(prev => ({
            ...prev,
            [qIndex]: optIndex
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const inp_answers = Object.values(answers);
        console.log(inp_answers)

        axios.post('http://localhost:3000/user/attempt_quiz/' + quizId, {
            answers: inp_answers
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(function (response) {
            alert(response.data.message);
            navigate(`/leaderboard/${quizId}`);
        }).catch(error => {
            alert("Some error occurred!");
        });

    }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    {quiz.questions?.map((q, qIndex) => (
                        <div key={qIndex} style={{ fontSize: "20px",display: "flex", flexDirection: 'column' }}>
                            <p>{qIndex + 1}.{q.question}</p>

                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <label>
                                    <input type='radio' name={`q${qIndex}`} value="1" checked={answers[qIndex] === "1"} onChange={() => handleChange(q._id, "1")} /> {q.option1}
                                </label>
                                <label>
                                    <input type='radio' name={`q${qIndex}`} value="2" checked={answers[qIndex] == "2"} onChange={() => handleChange(q._id, "2")} /> {q.option2}
                                </label>
                                <label>
                                    <input type='radio' name={`q${qIndex}`} value="3" checked={answers[qIndex] == "3"} onChange={() => handleChange(q._id, "3")} /> {q.option3}
                                </label>
                                <label>
                                    <input type='radio' name={`q${qIndex}`} value="4" checked={answers[qIndex] == "4"} onChange={() => handleChange(q._id   , "4")} /> {q.option4}
                                </label>
                            </div>
                        </div>
                    ))}
                    <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "80px", margin: "20px" }} type="submit">Submit</button>
                </form>
            </div>
        )

    }


    export default AttemptQuiz