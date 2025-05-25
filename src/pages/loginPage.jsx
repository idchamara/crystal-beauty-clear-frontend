import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin(
        {
            onSuccess: (res) => {
                setLoading(true);
                axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token

                }).then(
                    (response) => {
                        console.log("Login successful", response.data);
                        toast.success("Login successful");
                        localStorage.setItem("token", response.data.token);

                        const user = response.data.user;
                        if (user.role === "admin") {
                            navigate("/admin") // go to admin page
                        } else {
                            navigate("/") // go to home page
                        }
                        setLoading(false);
                    }
                )


            },
            onError: (error) => {
                console.log(error);
                toast.error("Google login failed");
            }
        }
    )

    function handleLogin() {
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login successful", response.data);
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if (user.role === "admin") {
                    navigate("/admin") // go to admin page
                } else {
                    navigate("/") // go to home page
                }
                setLoading(false);
            }
        ).catch(
            (error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            }
        );


        console.log("Login clicked");
    }
    return (
        <div className="w-full h-screen bg-[url(/LoginPageImage.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center">
                    <input onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }
                    } className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="e-mail" />
                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        }
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="password" />
                    <button
                        onClick={handleLogin}
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl m-[5px] hover:bg-green-600 transition-colors cursor-pointer">
                        {
                            loading ? "Loading..." : "Login"
                        }
                    </button>
                    <button
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl m-[5px] hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center"
                        onClick={loginWithGoogle}>
                        <GrGoogle className="mr-[10px]" />
                        {
                            loading ? "Loading..." : "Login with Google"
                        }

                    </button>
                    <p className="text-gray-500 text-m m-[5px]">
                        Don't have an account? &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </p>
                    {/* forget password */}
                    <p className="text-gray-500 text-m m-[5px]">
                        Forget Password? &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/forget"}>Reset Now</Link>
                        </span>
                    </p>
                </div>

            </div>
        </div>
    )
}