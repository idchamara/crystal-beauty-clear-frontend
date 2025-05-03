import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[70px] flex justify-center items-center bg-gray-100 shadow-lg relative">
            <div className="w-[500px] h-full flex justify-evenly items-center text-pink-400 text-xl">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <Link to="/products" className="hover:text-pink-600">Products</Link>
            <Link to="/contact" className="hover:text-pink-600">Contact</Link>
            <Link to="/reviews" className="hover:text-pink-600">Reviews</Link>
            <Link to="/cart" className="hover:text-pink-600 absolute right-[30px] text-3xl"><BsCart4 /></Link>
            </div>
        </header>
        
    );
};
