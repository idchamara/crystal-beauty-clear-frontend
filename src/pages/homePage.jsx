import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Home from "./client/home";

export default function HomePage() {
    return(
        <div className="w-full h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<ProductsPage/> }/>
                    <Route path="/overview/:id" element={<ProductOverview/> }/>
                    <Route path="/cart" element={<CartPage/> }/>
                    <Route path="/checkout" element={<CheckoutPage/> }/>
                    <Route path="/*" element={<h1>404 Not Found</h1> }/>
                </Routes>
            </div>
        </div>
    )
};