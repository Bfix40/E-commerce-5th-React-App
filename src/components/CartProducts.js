import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartProductThunk } from "../redux/actions";

const CartProducts = ({ prodObj }) => {
    
    const dispatch = useDispatch()
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        if (deleteId) {
            dispatch(deleteCartProductThunk(deleteId));
        }
    }, [dispatch, deleteId]);

    return (
        <div>
            <h1>{prodObj.product.name}</h1>
            <h3>Cantidad: {prodObj.quantity} </h3>
            <h2>Total :{prodObj.product.price * prodObj.quantity}</h2>
            <button onClick={()=> setDeleteId(prodObj.id)}>X</button>
        </div>
    );
}

export default CartProducts