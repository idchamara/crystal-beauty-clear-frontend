import { useState } from "react";

export default function Testing() {
    const [number,setNumber] = useState(0)
    const [status,setStatus] = useState("pending")

    function increment() {
        let newValue = number + 1;
        setNumber(newValue);
       // number = number + 1;
       // console.log(number);
    }

    function decrement() {
        let newValue = number - 1;
        setNumber(newValue);
      //  number = number - 1;
      //  console.log(number);
    }

    return (
        <div className="w-full h-scree flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{number}</span>
            <div className="w-full flex justify-center">
                <button onClick={increment} className="bg-blue-500 text-white rounded-lg p-2 m-2 w-[60px] cursor-pointer">+</button>
                <button onClick={decrement} className="bg-blue-500 text-white rounded-lg p-2 m-2 w-[60px] cursor-pointer">-</button>
            </div>

            <span className="text-3xl font-bold">{status}</span>
            <div className="w-full flex justify-center">
                <button onClick={()=>{
                    setStatus("passed")
                }} className="bg-blue-500 text-white rounded-lg p-2 m-2 w-[60px] cursor-pointer">Pass</button>
                <button onClick={()=>{
                    setStatus("failed")
                }} className="bg-blue-500 text-white rounded-lg p-2 m-2 w-[60px] cursor-pointer">Fail</button>
            </div>

        </div>
    )    
};