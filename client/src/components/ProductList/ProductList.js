import React, { useContext, useEffect } from "react";
import Product from "../Product/Product";
import "./ProductList.scss";
import ProductContext from "../ProductsState/productContext";
import UserContext from "../UserState/userContext";
const ProductList = () => {
  const productContext = useContext(ProductContext);
  const userContext = useContext(UserContext);
  const { products, getProducts } = productContext;
  const { LoadUser } = userContext;

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
      if (localStorage.getItem("token")) {
        //LoadUser();
      }
    }
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="product-list-title">
          <h1 className="product-list-title-left">Produse</h1>
        </div>

        <div className="row ">
          {products.map((product) => {
            return (
              <Product
                key={product._id}
                id={product._id}
                title={product.title}
                img={`${process.env.PUBLIC_URL}/${product.img}`}
                price={product.price}
              ></Product>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
