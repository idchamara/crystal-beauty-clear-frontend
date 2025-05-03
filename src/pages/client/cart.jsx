
import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"

export default function CartPage() {
    const [cartLoaded , setCartLoaded] = useState(false)
    const [cart , setCart] = useState([])
    useEffect(()=>{
        if(cartLoaded == false){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    },[cartLoaded])
    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map((item , index)=>{
                        return (
                            <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-700"
                                    onClick={()=>{
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                    }}>
                                    <TbTrash />
                                </button>
                                <img src={item.Image} className="h-full aspect-square object-cover" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-lg font-semibold text-gray-500">{item.altName.join(" | ")}</h2>
                                    <h2 className="text-lg font-semibold text-gray-500">LKR: {item.price.toFixed(2)}</h2> 
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[6px]"
                                    onClick={()=>{
                                        addToCart(item,-1)
                                        setCartLoaded(false)
                                    }}>-</button>
                                    <h3 className="text-2xl font-semibold text-center">{item.quantity}</h3>
                                    <button className="text-xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[6px]"
                                    onClick={()=>{
                                        addToCart(item,1)
                                        setCartLoaded(false)
                                    }}>+</button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h3 className="text-2xl font-semibold text-center">{(item.price*item.quantity).toFixed(2)}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}