import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import { IoCloseSharp } from "react-icons/io5"
import toast from "react-hot-toast";

export default function AdminOrdersPage(){
    const [orders , setOrders] = useState([]);
    const [loaded , setLoaded] = useState(false);
    const [modelIsDisplaying , setModelIsDisplaying] = useState(false);
    const [displayingOrder , setDisplayingOrder] = useState(null);

    useEffect(
        ()=>{
            if(!loaded){
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_BACKEND_URL+ "/api/order",{
                    headers:{
                        Authorization:"Bearer "+token
                    }
                }).then(
                    (response)=>{
                        setOrders(response.data)
                        setLoaded(true)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                        setLoaded(false)
                    }
                )
            }
        },[loaded]
    )

    function updateOrderStatus(orderId , status){
        const token = localStorage.getItem("token")
        axios.put(import.meta.env.VITE_BACKEND_URL+ "/api/order/"+orderId, {
            status: status
        },{
            headers:{
                Authorization:"Bearer "+token,
            },
        }).then(
            ()=>{
                toast.success("Order status updated successfully")
                setLoaded(false)
            }
        )
        
    }
    return(
        <div className="w-full h-full rounded-lg relative overflow-x-scroll">
            {
                loaded?
                <div className="w-full h-full ">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Customer Email</th>
                                <th className="p-2">Costomer Name</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {
                        orders.map(
                            (order)=>{
                                return (
                                    <tr 
                                    key={order.orderId} 
                                    className=" border-b-2 border-gray-300 text-center hover:bg-gray-100 cursor-pointer"
                                    >
                                        <td className="p-2">{order.orderId}</td>
                                        <td className="p-2">{order.email}</td>
                                        <td className="p-2">{order.name}</td>
                                        <td className="p-2">{order.address}</td>
                                        <td className="p-2">{order.phoneNumber}</td>
                                        <td className="p-2">
                                            <select 
                                            value={order.status} 
                                            onChange={(e)=>{
                                                updateOrderStatus(order.orderId,e.target.value)
                                            }}>
                                                <option value={"Pending"}>Pending</option>
                                                <option value={"Processing"}>Processing</option>
                                                <option value={"Completed"}>Completed</option>
                                                <option value={"Cancelled"}>Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-2">{order.total.toFixed(2)}</td>
                                        <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="p-2">
                                            <button 
                                            className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300"
                                            onClick={()=>{
                                                    setModelIsDisplaying(true)
                                                    setDisplayingOrder(order)
                                        }}
                                            >Details</button>
                                        </td>

                                    </tr>
                                )
                            }
                        )
                        }
                    
                        </tbody>
                    </table>
                    {
                        modelIsDisplaying &&
                        <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                            <div className="w-[600px] max-w-[600px] h-[600px] max-h-[600px] bg-white relative">
                                <div className="w-full h-[150px] ">
                                    <h1 className="text-sm font-bold  p-2">Oeder ID: {displayingOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold  p-2">Order Date: {new Date(displayingOrder.date).toDateString()}</h1>
                                    <h1 className="text-sm font-bold  p-2">Customer Status: {displayingOrder.status}</h1>
                                    <h1 className="text-sm font-bold  p-2">Order Total: {displayingOrder.total.toFixed(2)}</h1>
                                </div>
                                <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                    {
                                        displayingOrder.billItems.map((item, index)=>{
                                            return(
                                                <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-center items-center relative">
                                                    <img src={item.image} className="h-full aspect-square object-cover" />
                                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                        <h1 className="text-xl font-bold">{item.productName}</h1>
                                                        <h2 className="text-lg text-gray-500">LKR:{item.price.toFixed(2)}</h2>
                                                        <h2 className="text-lg text-gray-500">Quantity: {item.quantity}</h2>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button 
                                className="w-[40px] h-[40px] absolute right-[-20px] top-[-20px] rounded-full bg-white shadow shadow-black flex justify-center items-center cursor-pointer"
                                onClick={()=>{setModelIsDisplaying(false)}}>
                                    <IoCloseSharp />
                                </button>
                            </div>
                        </div>
                    }
                </div>
                :
                <Loader/>
            }
        </div>
    )
}

//795835836595-aquh97edpbpn9ojuolg243lsj09o5g7b.apps.googleusercontent.com