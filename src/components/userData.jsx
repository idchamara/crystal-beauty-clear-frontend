import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token != null) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setUser(response.data.user);
				})
				.catch((e) => {
					console.log(e);
					setUser(null);
				});
		}
	}, []);

    return (
        <>
        {user == null ? (
            <div className="h-full flex justify-center items-center flex-row">
                <Link to="/login" className="bg-pink-400 text-white p-2 rounded-md hover:bg-pink-600">Login</Link>
                <Link to="/register" className="bg-pink-400 text-white p-2 rounded-md hover:bg-pink-600 ml-4">Register</Link>
            </div>
        ) : (
            <div className="h-full flex justify-center items-center flex-row">
                <button className="bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600" 
                onClick={() =>{
                    localStorage.removeItem("token");
                    setUser(null);
                    window.location = "/login";
                }}>Logout</button>
            </div>
        )}
        </>
    )

}