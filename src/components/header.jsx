import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="w-full h-[70px] flex justify-start items-center bg-gray-100 shadow-lg relative">
            <GiHamburgerMenu className="text-3xl text-pink-400 mx-4 lg:hidden" 
            onClick={()=>{
                setIsOpen(true);
            }}/>
            <div className="hidden lg:flex w-[500px] h-full justify-evenly items-center text-pink-400 text-xl">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <Link to="/products" className="hover:text-pink-600">Products</Link>
            <Link to="/contact" className="hover:text-pink-600">Contact</Link>
            <Link to="/reviews" className="hover:text-pink-600">Reviews</Link>
            <Link to="/cart" className="hover:text-pink-600 absolute right-[30px] text-3xl"><BsCart4 /></Link>
            </div>
            {
                isOpen && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000060] flex z-[9999]">
                        <div className="w-[300px] h-full bg-white flex flex-col justify-start items-center">
                            <h1 className="text-3xl font-bold text-pink-400 mt-[50px]">Menu</h1>
                            <Link to="/" className="w-full h-[50px] flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all duration-300" onClick={()=>{setIsOpen(false)}}>Home</Link>
                            <Link to="/products" className="w-full h-[50px] flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all duration-300" onClick={()=>{setIsOpen(false)}}>Products</Link>
                            <Link to="/contact" className="w-full h-[50px] flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all duration-300" onClick={()=>{setIsOpen(false)}}>Contact</Link>
                            <Link to="/reviews" className="w-full h-[50px] flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all duration-300" onClick={()=>{setIsOpen(false)}}>Reviews</Link>
                            <Link to="/cart" className="w-full h-[50px] flex justify-center items-center hover:bg-pink-400 hover:text-white transition-all duration-300" onClick={()=>{setIsOpen(false)}}><BsCart4 /></Link>
                        </div>
                    </div>
                )
            }
        </header>
        
    );
};
