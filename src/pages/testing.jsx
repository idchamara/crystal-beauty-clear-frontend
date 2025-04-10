import { useState } from "react"
import toast from "react-hot-toast"
import mediaUpload from "../utils/mediaUpload"

// https://llsxrgvhyhqqmpafwugj.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsc3hyZ3ZoeWhxcW1wYWZ3dWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTM4MjMsImV4cCI6MjA1OTc4OTgyM30.DCzRSKHMlmW0ERmDOD-hTJ5z8k9sN4oR3HFxj0dXpg8


export default function Testing() {
    const [file, setFile] = useState(null)
    
    function handleUpload(){
        mediaUpload(file).then(
            (url)=>{
                console.log(url)
                toast.success("File Uploaded Successfully")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("File Upload Failed")
            }
        )

    }
    
    return (
        <div className="w-full h-scree flex flex-col items-center justify-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0]);
                }
            } />
            <button onClick={handleUpload} className="bg-gray-700 text-white p-2 rounded-lg">Upload</button>

        </div>
    )    
};