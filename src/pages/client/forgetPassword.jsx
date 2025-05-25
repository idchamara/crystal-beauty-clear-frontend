import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendEmail(){
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", {
            email: email
        }).then((response) => {
            console.log("Email sent successfully", response.data);
            setEmailSent(true);
            toast.success("Email sent successfully");
        }).catch((error) => {
            console.error("Error sending email", error);
            toast.error("Error sending email");
        });
    }

    function changePassword() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePw", {
            email: email,
            otp: otp,
            password: password
        }).then((response) => {
            console.log("Password changed successfully", response.data);
            toast.success("Password changed successfully");
            // Redirect to login page or home page
            window.location = "/login";
        }).catch((error) => {
            console.error("Error changing password", error);
            toast.error("Error changing password");
            // Refresh the page or handle error
            window.location.reload();
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            {
            emailSent ?
            <div className="w-full h-full flex items-center justify-center flex-col">
                <div className="w-full lg:w-[500px] h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>  
                    <h2 className="text-m font-semibold text-gray-500">Enter the OTP sent to your email</h2>
                    <input 
                    type="text" 
                    placeholder="OTP" 
                    className="w-full h-[50px] border border-gray-300 rounded-lg p-2 my-[10px]"
                    onChange={(e)=>{
                        setOtp(e.target.value);
                    }}
                    value={otp} />

                    <input 
                    type="password" 
                    placeholder="New Password" 
                    className="w-full h-[50px] border border-gray-300 rounded-lg p-2 my-[10px]"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    value={password} />

                    <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="w-full h-[50px] border border-gray-300 rounded-lg p-2 my-[10px]"
                    onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                    }}
                    value={confirmPassword} />

                    <button
                    className="w-full lg:w-[500px] h-[50px] bg-black text-white rounded-lg p-2 my-[10px] hover:bg-gray-800 cursor-pointer"
                    onClick={changePassword}>
                    Reset Password
                    </button>
                    
                </div>  

            </div>
            :<div className="w-full lg:w-[500px] h-full flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Forget Password</h1>
                    <h2 className="text-m font-semibold text-gray-500">Enter your email to reset your password</h2>
                    <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full h-[50px] border border-gray-300 rounded-lg p-2 my-[10px]"
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    value={email} />
                    <button 
                    className="w-full h-[50px] bg-black text-white rounded-lg p-2 my-[10px] hover:bg-gray-800"
                    onClick={sendEmail}>Send OTP</button>
                </div>
            </div>
            }
        </div>
    )
}