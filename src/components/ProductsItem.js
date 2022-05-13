import { Link } from "react-router-dom"

const ProductsItem = ({productsObj}) => {
  return (
      <Link to={`/shop/${productsObj.id}`}>
          <div>
              {productsObj.name}
          </div>
      </Link>
  );
}

export default ProductsItem