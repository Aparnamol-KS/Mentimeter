import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [name, setName] = useState(" ");
    const [mail, setMail] = useState(" ");
    const [username, setUsername] = useState(" ");

    useEffect(() => {
        axios
            .get("http://localhost:3000/getUser", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then(function (response) {
                const user = response.data.user;
                setName(user.name);
                setUsername(user.username);
                setMail(user.email);
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    alert("User not found");
                }
            });
    }, []);

    return (
        <div className="h-full bg-gray-900 text-white font-['Montserrat'] flex items-center justify-center px-4 py-10">
            <div className="max-w-lg w-full bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-gray-400 font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-400 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-400 font-semibold">
                            Email
                        </label>
                        <input
                            type="text"
                            value={mail}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow transition"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
