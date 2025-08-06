import axios from "axios";

function AdminSignUp() {

    function addAdmin() {

        axios.post('http://localhost:3000/signup/admin', {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }).then(function (response) {
            window.location = '/admin/signin'
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
        <h1 style={{ fontSize: "60px" }}>Admin Sign Up</h1>
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="text" placeholder="Username" id="username" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="email" placeholder="Email" id="email" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="text" placeholder="Name" id="name" />
        <input style={{ margin: "8px", width: "15%", padding: "7px" }} type="password" placeholder="Password" id="password" />
        <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "5px", width: "80px", margin: "20px" }} onClick={addAdmin}>Sign Up</button>
        <p>Already have an account ? <a style={{ textDecoration: "none", fontWeight: "bold" }} href="/admin/signin">Sign In</a></p>
    </div>
}


export default AdminSignUp