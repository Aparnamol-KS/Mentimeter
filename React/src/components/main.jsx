function Main() {
    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            fontFamily: "cambria",
            height:"100vh"
        }}
    >
        <h3 style={{ fontSize: "70px", margin:'10px' }}>Mini Menti Meter</h3>
        <p>Create, Share, and Explore Amazing quizes</p>
        <div>
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
                onClick={() => window.location = "/admin/dashboard"}
            >
                Admin
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
                onClick={() => window.location = "/user/dashboard"}
            >
                User
            </button>
        </div>

    </div>
}


export default Main;






