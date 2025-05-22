export default function ForgetPasswordPage() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full lg:w-[500px] h-full flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Forget Password</h1>
                    <h2 className="text-m font-semibold text-gray-500">Enter your email to reset your password</h2>
                    <input type="email" placeholder="Email" className="w-full h-[50px] border border-gray-300 rounded-lg p-2 my-[10px]" />
                    <button className="w-full h-[50px] bg-black text-white rounded-lg p-2 my-[10px] hover:bg-gray-800">Send Reset Link</button>
                </div>
            </div>
        </div>
    )
}