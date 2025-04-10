import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://llsxrgvhyhqqmpafwugj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsc3hyZ3ZoeWhxcW1wYWZ3dWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTM4MjMsImV4cCI6MjA1OTc4OTgyM30.DCzRSKHMlmW0ERmDOD-hTJ5z8k9sN4oR3HFxj0dXpg8"
);


export default function mediaUpload(file){
    const promise = new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp + file.name

            supabase.storage.from("crystalimages").upload(newFileName, file ,{
                cacheContol: "3600",
                upsert: false
            }).then(
                ()=>{
                    const url = supabase.storage.from("crystalimages").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File upload failed")
                }
            )

        }
    )
    return promise

}
