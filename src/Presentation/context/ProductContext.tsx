import React, { useState } from "react";
import { createContext } from "react";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from "../../Domain/entities/Product";
import * as ImagePicker from "expo-image-picker";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory";

export interface ProductContextProps {
  products: Product[];
  create(
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery>;
  getProducts(id_category: string): Promise<void>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async (id_category: string): Promise<void> => {
    const result = await GetProductsByCategoryUseCase(id_category);
    setProducts(result);
  };

  const create = async (
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery> => {
    const response = await CreateProductUseCase(product, files);
    getProducts(product.id_category!);
    return response;
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        create,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
