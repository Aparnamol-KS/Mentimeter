import { useState } from "react"
import axios from "axios"

function CreateQuiz() {
    const [title, setTitle] = useState("")
    const [questions, setQuestions] = useState([{ question: "", option1: "", option2: "", option3: "", option4: "", answer: "" }])

    const addQn = () => setQuestions([...questions, { question: "", option1: "", option2: "", option3: "", option4: "", answer: "" }])

    const updateQn = (index, field, value) => {
        const updated = [...questions]
        updated[index][field] = value
        setQuestions(updated)
    };


    function handleSubmit(){
        const quizData = { title, questions }

        axios.post('http://localhost:3000/admin/create-quiz', {
            "title": quizData.title,
            "questions": quizData.questions
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(function (response) {
            alert("Quiz submitted!")
            window.location ='/admin/main'
        }).catch(error => {
            alert(response.data.message)
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "30px", padding: "20px 30%" }}>
            <p>Title</p>
            <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            {questions.map((q, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                    <p>Question {index + 1}</p>
                    <input style={{ padding: "20px", marginTop: "10px", border: "2px solid black" }} type="text" placeholder="Question" value={q.question} onChange={(e) => updateQn(index, "question", e.target.value)} required/>
                    <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Option1" value={q.option1} onChange={(e) => updateQn(index, "option1", e.target.value)} required/>
                    <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Option2" value={q.option2} onChange={(e) => updateQn(index, "option2", e.target.value)} required/>
                    <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Option3" value={q.option3} onChange={(e) => updateQn(index, "option3", e.target.value)} required/>
                    <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Option4" value={q.option4} onChange={(e) => updateQn(index, "option4", e.target.value)} required/>
                    <input style={{ padding: "10px", marginTop: "10px" }} type="text" placeholder="Answer" value={q.answer} onChange={(e) => updateQn(index, "answer", e.target.value)} required />
                </div>
            ))}
            <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "9px", width: "20%", marginTop: "20px" }} onClick={addQn}>+ Add Question</button>
            <button style={{ backgroundColor: "green", color: "white", borderRadius: "5px", padding: "9px", width: "20%", marginTop: "20px" }} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CreateQuiz
