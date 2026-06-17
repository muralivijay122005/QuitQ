import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <Link
                    to="/admin/products"
                    className="bg-slate-900 p-6 rounded-xl border border-slate-800"
                >
                    <h2 className="text-xl font-semibold">
                        Products
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Manage inventory
                    </p>
                </Link>

                <Link
                    to="/admin/categories"
                    className="bg-slate-900 p-6 rounded-xl border border-slate-800"
                >
                    <h2 className="text-xl font-semibold">
                        Categories
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Manage categories
                    </p>
                </Link>

                <Link
                    to="/admin/orders"
                    className="bg-slate-900 p-6 rounded-xl border border-slate-800"
                >
                    <h2 className="text-xl font-semibold">
                        Orders
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Manage customer orders
                    </p>
                </Link>

            </div>

        </div>
    );
}

export default AdminDashboard;