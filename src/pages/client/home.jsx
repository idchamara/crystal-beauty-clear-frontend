import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="w-full">
			{/* Hero Section */}
			<section className="w-full h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center text-center px-4 sm:px-8">
				<div className="max-w-2xl">
					<h1 className="text-4xl sm:text-6xl font-bold text-pink-900 mb-4">
						Beauty Essentials, Delivered
					</h1>
					<p className="text-lg sm:text-xl text-pink-800 mb-8">
						Discover your glow with our curated collection of premium beauty and skincare products.
					</p>
					<button
						onClick={() => navigate("/products")}
						className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg transition cursor-pointer"
					>
						Shop Now
					</button>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-16 px-6 bg-white">
				<h2 className="text-3xl font-bold text-center text-pink-800 mb-10">Featured Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<ProductCard name="Glow Serum" image="/images/glow-serum.jpg" price="2990" />
					<ProductCard name="Lip Tint Set" image="/images/lip-tint-set.jpg" price="1990" />
					<ProductCard name="Face Mask Pack" image="/images/face-mask-pack.jpg" price="1490" />
				</div>
			</section>

			{/* Categories */}
			<section className="bg-pink-50 py-16 px-6">
				<h2 className="text-3xl font-bold text-center text-pink-800 mb-10">Shop by Category</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
					<CategoryCard name="Skincare" icon="/assets/category-icons/skincare-icon.svg" />
					<CategoryCard name="Makeup" icon="/assets/category-icons/makeup-icon.svg" />
					<CategoryCard name="Haircare" icon="/assets/category-icons/haircare-icon.svg" />
					<CategoryCard name="Fragrance" icon="/assets/category-icons/fragrance-icon.svg" />
				</div>
			</section>

			{/* CTA Section */}
			<section className="w-full bg-pink-600 text-white py-16 px-6 text-center">
				<h2 className="text-3xl sm:text-4xl font-bold mb-6">Your Beauty Journey Starts Here</h2>
				<p className="text-lg mb-8">Browse our latest arrivals and exclusive deals today.</p>
				<button
					onClick={() => navigate("/products")}
					className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition cursor-pointer"
				>
					Start Shopping
				</button>
			</section>
		</div>
	);
}

function ProductCard({ name, image, price }) {
	const [imgSrc, setImgSrc] = React.useState(image || "https://via.placeholder.com/200x200.png?text=Product+Image");

	const handleImageError = () => {
		setImgSrc("https://via.placeholder.com/200x200.png?text=Product+Image");
	};

	return (
		<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
			<img 
				src={imgSrc} 
				alt={name} 
				className="w-full h-[200px] object-cover" 
				onError={handleImageError} 
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-pink-800">{name}</h3>
				<p className="text-sm text-gray-600 mt-1">LKR {price}</p>
			</div>
		</div>
	);
}

function CategoryCard({ name, icon }) {
	return (
		<div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center">
			{icon && <img src={icon} alt={`${name} icon`} className="w-16 h-16 mb-2 object-contain" />}
			<p className="text-pink-700 font-medium">{name}</p>
		</div>
	);
}
