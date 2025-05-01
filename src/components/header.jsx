import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[70px] flex justify-center items-center bg-gray-100 shadow-lg ">
            <div className="w-[500px] h-full flex justify-evenly items-center text-pink-400 text-xl">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <Link to="/products" className="hover:text-pink-600">Products</Link>
            <Link to="/contact" className="hover:text-pink-600">Contact</Link>
            <Link to="/reviews" className="hover:text-pink-600">Reviews</Link>
            </div>
        </header>
        
    );
};
