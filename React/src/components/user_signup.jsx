import axios from "axios";

function UserSignUp() {

    function addUser() {

        axios.post('http://localhost:3000/signup/user', {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }).then(function (response) {
            window.location = '/user/signin'
        }).catch(error => {
            alert("some error occured!!")
        })
    }


    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        fontFamily: "cambria"

    }}>
        <h1 style={{ fontSize: "60px" }}>User Sign Up</h1>
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="text" placeholder="Username" id="username" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="email" placeholder="Email" id="email" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="text" placeholder="Name" id="name" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="password" placeholder="Password" id="password" />
        <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "80px", margin: "20px" }} onClick={addUser}>Sign Up</button>
        <p>Already have an account ? <a style={{ textDecoration: "none", fontWeight: "bold" }} href="/user/signin">Sign In</a></p>
    </div>
}


export default UserSignUp