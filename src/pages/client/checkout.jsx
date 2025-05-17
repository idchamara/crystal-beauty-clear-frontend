import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
	const location = useLocation();
	const [cart, setCart] = useState(location.state.items);
	const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
	const navigate = useNavigate();
   function placeOrder(){
    
        const orderData = {
            name : name,
            address : address,
            phoneNumber :phone,
            billItems : []        
        }
        for(let i = 0; i< cart.length; i++){
            orderData.billItems[i] = {
                productId : cart[i].productId,
                quantity : cart[i].quantity
            }
        }
        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
                Authorization: "Bearer " + token,
            },            
        }).then(()=>{
            toast.success("Order placed successfully");
            navigate("/");
        }).catch((error)=>{
            console.log(error);
            toast.error("Order placement failed");
        })
   }

	function getTotal() {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.quantity;
		});
		return total;
	}
	function getTotalForLabelledPrice() {
		let total = 0;
		cart.forEach((item) => {
			total += item.labeledPrice * item.quantity;
		});
		return total;
	}
	
    return (
	<div className="w-full min-h-screen flex justify-center p-4 sm:p-10">
		<div className="w-full max-w-[700px]">
			{cart.map((item, index) => {
				return (
					<div
						key={index}
						className="w-full bg-white shadow-md my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between relative p-2 sm:p-0"
					>
						<button
							className="absolute top-2 right-2 sm:right-[-50px] bg-red-500 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
							onClick={() => {
								const newCart = cart.filter(
									(product) => product.productId !== item.productId
								);
								setCart(newCart);
							}}
						>
							<TbTrash />
						</button>
						<div className="flex flex-col sm:flex-row sm:items-center">
							<img src={item.Image} className="w-full sm:h-[100px] sm:w-auto object-cover" />
							<div className="flex flex-col justify-between px-2 max-w-full sm:max-w-[300px]">
								<h1 className="text-lg sm:text-xl font-bold">{item.name}</h1>
								<h2 className="text-sm sm:text-base text-gray-500">{(item.altNames || []).join(" | ")}</h2>
								<h2 className="text-sm sm:text-base text-gray-500">LKR: {item.price.toFixed(2)}</h2>
							</div>
						</div>
						<div className="flex justify-center items-center mt-2 sm:mt-0">
							<button
								className="text-lg sm:text-2xl w-8 h-8 bg-black text-white rounded-full flex justify-center items-center mx-1"
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
									setCart(newCart);
									setCartRefresh(!cartRefresh);
								}}
							>
								-
							</button>
							<h1 className="text-base sm:text-xl font-bold">{item.quantity}</h1>
							<button
								className="text-lg sm:text-2xl w-8 h-8 bg-black text-white rounded-full flex justify-center items-center mx-1"
								onClick={() => {
									const newCart = [...cart];
									newCart[index].quantity += 1;
									setCart(newCart);
									setCartRefresh(!cartRefresh);
								}}
							>
								+
							</button>
						</div>
						<div className="text-end sm:w-[100px] px-2">
							<h1 className="text-base sm:text-xl font-semibold">{(item.price * item.quantity).toFixed(2)}</h1>
						</div>
					</div>
				);
			})}

			{/* Totals */}
			<div className="w-full text-right space-y-1 mt-4">
				<div className="flex justify-end">
					<h1 className="w-24 text-base sm:text-xl">Total</h1>
					<h1 className="w-28 text-base sm:text-xl">{getTotalForLabelledPrice().toFixed(2)}</h1>
				</div>
				<div className="flex justify-end">
					<h1 className="w-24 text-base sm:text-xl">Discount</h1>
					<h1 className="w-28 text-base sm:text-xl border-b-2">
						{(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
					</h1>
				</div>
				<div className="flex justify-end">
					<h1 className="w-24 text-base sm:text-xl">Net Total</h1>
					<h1 className="w-28 text-base sm:text-xl border-b-4 border-double">
						{getTotal().toFixed(2)}
					</h1>
				</div>
			</div>

			{/* User Inputs */}
			<div className="mt-4 space-y-3">
				<div className="flex flex-col sm:flex-row justify-end items-end">
					<label className="w-full sm:w-24 text-base sm:text-xl text-right sm:pr-2">Name</label>
					<input
						className="w-full sm:w-[200px] text-base sm:text-xl border-b-2 text-end pr-2"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col sm:flex-row justify-end items-end">
					<label className="w-full sm:w-24 text-base sm:text-xl text-right sm:pr-2">Phone</label>
					<input
						className="w-full sm:w-[200px] text-base sm:text-xl border-b-2 text-end pr-2"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className="flex flex-col sm:flex-row justify-end items-end">
					<label className="w-full sm:w-24 text-base sm:text-xl text-right sm:pr-2">Address</label>
					<input
						className="w-full sm:w-[200px] text-base sm:text-xl border-b-2 text-end pr-2"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
			</div>

			{/* Place Order Button */}
			<div className="w-full flex justify-end mt-4">
				<button
					className="w-full sm:w-[170px] text-base sm:text-xl text-center shadow bg-pink-500 hover:bg-pink-600 text-white h-[45px] rounded-lg"
					onClick={placeOrder}
				>
					Place Order
				</button>
			</div>
		</div>
	</div>
);
}