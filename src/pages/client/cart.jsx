
import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
    const [cartLoaded , setCartLoaded] = useState(false)
    const [cart , setCart] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        if(cartLoaded == false){
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    },[cartLoaded])
    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map((item , index)=>{
                        return (
                            <div key={index} className="w-full lg:h-[100px] bg-white shadow-lg my-[5px] flex lg:flex-row flex-col justify-between items-center relative">
                                <button className="absolute right-4 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-700"
                                    onClick={()=>{
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                    }}>
                                    <TbTrash />
                                </button>
                                <img src={item.Image} className="h-[100px] lg:h-full aspect-square object-cover" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden ">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-m font-semibold text-gray-500">{item.altName.join(" | ")}</h2>
                                    <h2 className="text-m font-semibold text-gray-500">LKR: {item.price.toFixed(2)}</h2> 
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[6px]"
                                    onClick={()=>{
                                        addToCart(item,-1)
                                        setCartLoaded(false)
                                    }}>-</button>
                                    <h3 className="text-xl text-center">{item.quantity}</h3>
                                    <button className="text-xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[6px]"
                                    onClick={()=>{
                                        addToCart(item,1)
                                        setCartLoaded(false)
                                    }}>+</button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h3 className="text-xl w-full text-end pr-2">{(item.price*item.quantity).toFixed(2)}</h3>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Total</h1>
                    <h1 className="w-[100px] text-xl text-end pr-2">{getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Discount</h1>
                    <h1 className="w-[100px] text-xl text-end pr-2 border-b-[2px]">{((getTotalForLabelledPrice())-(getTotal())).toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Net Total</h1>
                    <h1 className="w-[100px] text-xl text-end pr-2 border-b-[4px] border-double">{getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <button className="w-[170px] h-[50px] bg-pink-400 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-pink-700 mt-[20px] shadow-lg"
                    onClick={() => {
                        navigate("/checkout", {
                            state: {
                                items: cart
                            }
                        }
                        )
                    }}>
                        <h1 className="text-xl font-semibold">Checkout</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}