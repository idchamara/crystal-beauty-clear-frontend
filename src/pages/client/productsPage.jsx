import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductsPage() {
    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [search, setSearch] = useState("")
    useEffect(
        () =>{
           if (!productsLoaded){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then(
                (res) => {
                    setProductList(res.data)
                    setProductsLoaded(true)
                    
                }
            )
           }

        },[productsLoaded]
    );

    function searchProduct(){
        if(search.length>0){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/"+search).then(
                (res) => {
                    setProductList(res.data.products)
                }       
            )
        }
    }
    return (
        <div className="w-full h-full ">
            <div className="w-full px-4 py-4 bg-gray-100 shadow-sm rounded-md flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative w-full sm:w-[300px]">
        <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111 3a7.5 7.5 0 015.65 13.65z" />
        </svg>
        </div>

        <div className="flex gap-2">
        <button
            onClick={searchProduct}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
            Search
        </button>
        <button
            onClick={() => setProductsLoaded(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition"
        >
            Reset
        </button>
        </div>
        </div>
            {
                productsLoaded?
                <div className="w-full h-full flex flex-wrap justify-center">
                    {
                        productList.map(
                            (product,index)=>{
                                return (
                                    <ProductCard key={product.productId} product={product}/>
                                )

                            }
                        )
                    }
                </div>
                :
                <Loader/>
            }
        </div>

    );
};