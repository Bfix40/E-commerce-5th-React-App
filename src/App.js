import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedPages from "./pages/ProtectedPages";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Rutas Publicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Rutas Privadas */}
                <Route element={<ProtectedPages />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:id" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/success" element={<div>
                        <h1>Gracias por tu compra</h1>
                        <button><Link to={'/shop'}>Shop</Link></button>
                    </div>} />
                </Route>
            </Routes>
        </div>
    );
}


export default App;
