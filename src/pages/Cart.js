import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CartProducts from "../components/CartProducts"
import { setCartProductsThunk } from "../redux/actions"
import { postCheckout } from "../services"


const Cart = () => {

    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    const cartValues = useSelector(state => state.cart)
    const navigate = useNavigate()
    const [confirmCheckout, setConfirmCheckout] = useState(false)

    useEffect(() => {
        dispatch(setCartProductsThunk())
    }, [dispatch])
    
    useEffect(() => {
        let amount = 0;
        cartValues.forEach((item) => amount += item.product.price * item.quantity)
            setTotal(amount);
    }, [cartValues]);

    useEffect(() => {
        if (confirmCheckout) {
            postCheckout().then(() => {
                setConfirmCheckout(false);
                navigate(`/cart/success/`);
            });
        }
    }, [confirmCheckout, navigate]);

    const list = cartValues.map((item) => {
        return <CartProducts prodObj={item} key={item.id}/>
    })

    return (
        <div>
            <h1>Cart</h1>

            {list}
            <h2>Total in Cart</h2>
            {total}
            <button onClick={() => setConfirmCheckout(true)}>Checkout</button>
        </div>
    );
}

export default Cart