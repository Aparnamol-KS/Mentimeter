

function UserDashboard(){
    return (
        <div>
            
            <h1 style={{ fontSize: "60px" }}>User Dashboard</h1>

            <button
                style={{
                    marginRight: "10px",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
                onClick={() => window.location = "/user/signup"}
            >
                Get Started
            </button>

            <button
                style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
                onClick={() => window.location = "/user/signin"}
            >
                Sign In
            </button>
        </div>
    )
}

export default UserDashboard