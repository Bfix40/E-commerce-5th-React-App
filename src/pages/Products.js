import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { setInfoProductThunk, setProductThunk } from "../redux/actions"
import { addProductToCart } from "../services"

const Products = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.productInfo);
    const filterProducts = useSelector((state)=> state.products)
    const [quantity, setQuantity] = useState(1)
    const [confirm, setConfirm] = useState(false)
    const [filterProd, setFilterProd] = useState([])

    
    useEffect(() => {
        dispatch(setInfoProductThunk(id))
    },[dispatch, id])

    useEffect(() => {
        if (quantity && confirm) {
            addProductToCart({
                product: id,
                quantity: quantity,
            })
                .then((res) => {
                setConfirm(false)
            });
        }
    }, [quantity, id, confirm]);

    useEffect(() => {
        if (products.category?.id) {
            dispatch(setProductThunk(products.category.id));
            setFilterProd(filterProducts.filter((item) => products.id !== item.id));
        }
    }, [filterProducts, dispatch, products, id]);


    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const increment = () => {
        setConfirm(false);
        setQuantity(quantity + 1);
    };


     return (
         <div>
             <h1>{products.name}</h1>
             <div>
                 <button onClick={decrement}>-</button>
                 {quantity}
                 <button onClick={increment}>+</button>
                 <button onClick={() => setConfirm(true)}>Add to Cart</button>
                 <button>
                     <Link to={"/cart"}>Cart</Link>
                 </button>
             </div>
             <p>{products.description}</p>
             {products.images?.map((item) => (
                 <img
                     style={{ width: "200px", height: "auto" }}
                     src={item.url}
                     alt=""
                     key={item.url}
                 />
             ))}
             <h2>Productos relacionados</h2>
             {filterProd.map((products) => (
                 <div key={products?.id}>
                     <h3>{products.name}</h3>
                     <img
                         width={"200 px"}
                         src={products.images[0].url}
                         alt=""
                     />
                 </div>
             ))}
         </div>
     );
}

export default Products