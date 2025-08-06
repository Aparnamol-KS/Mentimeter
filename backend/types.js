const zod = require('zod')

const SignUpInput = zod.object({
    username: zod.string().max(20).min(3),
    name: zod.string().min(3).max(50),
    email: zod.string().email(),
    password: zod.string().min(3).max(8)
})

const SigninInput = zod.object({
    username: zod.string().max(20).min(3),
    password: zod.string().min(3).max(8)
})


const QuizInput = zod.object({
    title: zod.string(),
    questions: [{
        question: zod.string(),
        option1:zod.string(),
        option2:zod.string(),
        option3:zod.string(),
        option4:zod.string(),
        answer: zod.string()
    }]
})

module.exports = {
    SignUpInput,
    SigninInput,
    QuizInput
}