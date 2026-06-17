import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    QuitQ
                </Link>

                <div className="flex gap-6 items-center">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>
                    <Link to="/admin">
                        Admin
                    </Link>

                    <Link to="/orders">
                        Orders
                    </Link>

                    <button
                        onClick={logout}
                        className="bg-red-600 px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;