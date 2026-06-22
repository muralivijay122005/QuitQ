import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageOrders from "./pages/admin/ManageOrders";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
    const {
        isAuthenticated,
        isAdmin
    } = useAuth();

    return (
        <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen ">
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Home />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/products"
                    element={
                        isAuthenticated
                            ? <Products />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        isAuthenticated
                            ? <ProductDetails />
                            : <Navigate to="/login" />
                    }
                />
                <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
                <Route
                    path="/cart"
                    element={
                        isAuthenticated
                            ? <Cart />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        isAuthenticated
                            ? <Checkout />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isAuthenticated
                            ? <Profile />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/orders"
                    element={
                        isAuthenticated
                            ? <Orders />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/orders/:id"
                    element={
                        isAuthenticated
                            ? <OrderDetails />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        isAuthenticated && isAdmin
                            ? <AdminDashboard />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        isAuthenticated && isAdmin
                            ? <ManageProducts />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/admin/categories"
                    element={
                        isAuthenticated && isAdmin
                            ? <ManageCategories />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        isAuthenticated && isAdmin
                            ? <ManageOrders />
                            : <Navigate to="/" />
                    }
                />

            </Routes>
        </div>
    );
}

export default App;