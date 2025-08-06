const { default: mongoose } = require("mongoose")
require('dotenv').config(); 

mongoose.connect(process.env.MONGODB_URI)


const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    name: String,
    password: String,
    role: String
})


const quizSchema = new mongoose.Schema({
    userId: String,
    title: String,
    questions: [{ 
        question: String,
        option1:String,
        option2:String,
        option3:String,
        option4:String,
        answer:String
     }]
})

const leaderBoardSchema = new mongoose.Schema({
    quizId : String,
    attendees:[{
        username:String,
        score:Number
    }]
})

module.exports = {
    UserModel: mongoose.model("users", userSchema),
    QuizModel : mongoose.model("quizes",quizSchema),
    LeaderBoardModel : mongoose.model("leaderboard",leaderBoardSchema)
}

