import React, { useContext } from "react";
import { ProductContext } from "../../../../context/ProductContext";

const AdminProductListViewModel = () => {
  const { products, getProducts } = useContext(ProductContext);
  return {
    products,
    getProducts,
  };
};

export default AdminProductListViewModel;
