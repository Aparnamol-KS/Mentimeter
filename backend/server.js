const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware.js')
const cors = require('cors')
const { SignUpInput, SigninInput, QuizInput } = require('./types.js')
require('dotenv').config();

const { UserModel, QuizModel, LeaderBoardModel } = require('./model.js');

JWT_KEY = process.env.JWT_KEY

const app = express()
app.use(cors())

app.use(express.json())

app.post('/signup/admin', (req, res) => {

    const response = SignUpInput.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }

    const { email, username, name, password } = req.body

    UserModel.findOne({
        username: username
    }).then(function (user) {
        if (user) {
            res.status(403).json({
                message: "user already exist!!"
            })
        } else {
            UserModel.create({
                email,
                username,
                name,
                password,
                role: "admin"
            })
            res.send({
                message: "Admin created!!",
            })
        }
    })
})


app.post('/signup/user', (req, res) => {

    const response = SignUpInput.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }
    const { email, username, name, password } = req.body

    UserModel.findOne({
        username: username
    }).then(function (user) {
        if (user) {
            res.status(403).json({
                message: "user already exist!!"
            })
        } else {
            UserModel.create({
                email,
                username,
                name,
                password,
                role: "user"
            })
            res.send({
                message: "user created!!",
            })
        }
    })
})

app.post('/signin/admin', (req, res) => {

    const response = SigninInput.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }
    const { username, password } = req.body;
    UserModel.findOne({
        username: username,
        password: password
    }).then(function (user) {
        if (user && user.role == 'admin') {
            let token = jwt.sign({ username, password }, JWT_KEY)
            res.json({
                token,
                user
            })
        } else {
            res.status(403).json({
                message: "You are not an admin!!!"
            })
        }
    })

})

app.post('/signin/user', (req, res) => {
    const response = SigninInput.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }

    const { username, password } = req.body;
    UserModel.findOne({
        username: username,
        password: password
    }).then(function (user) {
        if (user) {
            let token = jwt.sign({ username, password }, JWT_KEY)
            res.json({
                token,
                user
            })
        } else {
            res.status(403).json({
                message: "user not found!!"
            })
        }
    })

})


app.post("/admin/create-quiz", authMiddleware, (req, res) => {
    const user = req.user;
    const { title, questions } = req.body;
    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        if (user.role == "admin") {
            QuizModel.create({
                userId: user._id,
                title: title,
                questions: questions
            }).then(function (response) {
                res.json({
                    message: "quiz added successfully!!",
                    response
                })
            })
        } else {
            res.status(403).json({
                message: "You are not an admin "
            })
        }

    }
})

app.get('/admin/quiz/:quizId', authMiddleware, (req, res) => {
    quizId = req.params.quizId;
    user = req.user;
    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        if (user.role == "admin") {
            QuizModel.findOne({
                _id: quizId
            }).then(function (quiz) {
                if (quiz) {
                    res.send(quiz)
                } else {
                    res.status(403).json({
                        message: "Quiz is not available!!"
                    })
                }
            })
        } else {
            res.status(403).json({
                message: "You are not an admin "
            })
        }
    }
})

app.post('/admin/updateQuiz/:quizId', authMiddleware, (req, res) => {

    const response = QuizInput.safeParse(req.body);
    if (!response.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }
    quizId = req.params.quizId;
    const { title, questions } = req.body;
    user = req.user;
    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        if (user.role == "admin") {
            QuizModel.updateOne({
                _id: quizId
            }, { title, questions }).then(function (response) {
                res.send(response)
            })
        } else {
            res.status(403).json({
                message: "You are not an admin "
            })
        }
    }
})


app.get('/user/view_quiz', authMiddleware, (req, res) => {
    user = req.user;
    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        QuizModel.find({
        }).then(function (quizes) {
            if (quizes) {
                res.send(quizes)
            } else {
                res.status(403).json({
                    message: "Error sending quizes!!"
                })
            }
        })
    }
})

app.get('/user/attempt_quiz/:quiz_id', authMiddleware, (req, res) => {
    const quiz_id = req.params.quiz_id;
    const user = req.user;
    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        QuizModel.findOne({
            _id: quiz_id
        }).then(function (quiz) {
            if (quiz) {
                res.send(quiz)
            } else {
                res.status(403).json({
                    message: "Quiz is not available!!"
                })
            }
        })
    }

})


app.post('/user/attempt_quiz/:quiz_id', authMiddleware, (req, res) => {
    const user = req.user;
    const { answers } = req.body;
    let quiz_id = req.params.quiz_id;

    if (!user) {
        res.status(403).json({
            message: "user not found!!"
        })
    } else {
        QuizModel.findOne({
            _id: quiz_id
        }).then(function (quiz) {
            if (quiz) {
                let answersDB = []
                quiz.questions.forEach(q => {
                    answersDB.push({
                        questionId: q._id,
                        answer: q.answer
                    })
                });
                let count = 0
                for (let i = 0; i < answersDB.length; i++) {
                    if (answersDB[i].answer == answers[i].selectedOption && answersDB[i].questionId == answers[i].questionId) {
                        count++;
                    }
                }

                LeaderBoardModel.findOne({
                    quizId: quiz_id
                }).then(function (quiz) {
                    if (quiz) {

                        LeaderBoardModel.updateOne({
                            quizId: quiz_id
                        }, { $push: { attendees: { username: user.username, score: count } } }).then(function (response) {
                            return res.json({
                                "score": count,
                                "total": answersDB.length,
                                "message": "Submission evaluated"
                            })
                        })
                    } else {
                        LeaderBoardModel.create({
                            quizId: quiz_id,
                            attendees: [{
                                username: user.username,
                                score: count
                            }]
                        })
                        return res.json({
                            "score": count,
                            "total": answersDB.length,
                            "message": "Submission evaluated"
                        })
                    }
                })
            } else {
                res.status(403).json({
                    message: "Quiz not exist !"
                })
            }
        })
    }


})

app.get('/leaderboard/:quiz_id', function (req, res) {
    const user = req.user;
    const quiz_id = req.params.quiz_id;

    LeaderBoardModel.findOne({
        quizId: quiz_id
    }).then(function (obj) {
        if (obj) {
            let leaderboard = obj.attendees.sort((a, b) => b.score - a.score);
            return res.send(leaderboard)
        } else {
            return res.json({
                message: "quiz not exist!!"
            })
        }
    })
})

app.listen(3000);

