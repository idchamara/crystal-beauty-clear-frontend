export default function Header() {
    return (
        <header className="w-full bg-blue-600 h-[60px] flex items-center justify-between px-6 shadow-lg rounded-b-lg">
            <h1 className="text-[40px] font-semibold text-white">My Store</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:text-blue-300 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">Shop</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
