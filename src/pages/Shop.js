import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductsItem from "../components/ProductsItem"
import { setCategoriesInfoThunk, setFilterByNameThunk, setProductThunk } from "../redux/actions"


const Shop = () => {

    const dispatch = useDispatch()
    const productArr = useSelector((state) => state.products);
    const categoriesArr = useSelector(state => state.categories)
    
    const [currentCategories, setCurrentCategories] = useState('')
    const [nameProduct, setNameProduct]= useState('')

    useEffect(() => {
        dispatch(setProductThunk(currentCategories));
        dispatch(setCategoriesInfoThunk());
    }, [dispatch, currentCategories]);

    
    const searchProductName = (e) => {
        e.preventDefault()
        dispatch(setFilterByNameThunk(nameProduct))
        
    }

    const list = productArr.map((item) => <ProductsItem key={item.id} productsObj={item}/>)
    const categoriesList = categoriesArr.map((item) => (
        <button key={item.id} onClick={() => setCurrentCategories(item.id)}>
            {item.name}
        </button>
    ));

  return (
      <div>
          <h1>Esta es mi tienda</h1>
          <form onSubmit={searchProductName}>
              <input
                  type="text"
                  placeholder="Search Product"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
              />
              <button>Search</button>
          </form>
          <button onClick={() => setCurrentCategories("")}>
              All categories
          </button>
          {categoriesList}
          {list}
      </div>
  );
}

export default Shop