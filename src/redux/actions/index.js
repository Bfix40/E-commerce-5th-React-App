import { deleteProductsCart, getFilterCategories, getFilterProducts, getProducts, getProductsById, getProductsByName, getProductsFromCart } from "../../services"

export const actions = {
    productSetAll: "@product/setAll",
    productSetInfoById: "@productInfo/setById",
    categoriesSetValues: "@categories/setValues",
    cartSetProducts: "@cart/setProducts",
};

//forma de hacerlo mas sencillo para no poder hacerlo con los strings

export const productSetAll = (data) => ({
    type: actions.productSetAll,
    payload: data
})

export const setProductInfo = (data) => ({
    type: actions.productSetInfoById,
    payload: data
})

export const setCategories = (data) => ({
    type: actions.categoriesSetValues,
    payload: data,
});

export const setProductToCart = (data) => ({
    type: actions.cartSetProducts,
    payload: data,
});



//siempre termina en Thunk, no lleva parametro y se utiliza el dispacth =>{} al final

export const setProductThunk = (category) => {
    return dispatch => {
        if (category) {
            getFilterProducts(category)
                .then((res) => {
                dispatch(productSetAll(res))
            })
        } else {
            getProducts().then((res) => {
                return dispatch(productSetAll(res));
            });
        }
    }
}

export const setInfoProductThunk = (id) => {
    return (dispatch) => {
        getProductsById(id)
            .then((res) => {
          return dispatch(setProductInfo(res))
        })
    } 
}

export const setCategoriesInfoThunk = () => {
    return (dispatch) => {
        getFilterCategories().then((res) => {
            return dispatch(setCategories(res));
        });
    };
};

export const setFilterByNameThunk = (name) => {
    return (dispatch) => {
        getProductsByName(name).then((res) => {
            return dispatch(productSetAll(res));
        });
    };
};

export const setCartProductsThunk = () => {
    return (dispatch) => {
        getProductsFromCart()
            .then((res) => {
                dispatch(setProductToCart(res))
            })
    }
}

export const deleteCartProductThunk = (id) => {
    return (dispatch) => {
        deleteProductsCart(id)
            .then(() => {
                dispatch(setCartProductsThunk())
            })
    }
}