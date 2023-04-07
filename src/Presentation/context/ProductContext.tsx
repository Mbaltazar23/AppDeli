import React, { useState } from "react";
import { createContext } from "react";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from "../../Domain/entities/Product";
import * as ImagePicker from "expo-image-picker";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory";
import { DeleteProductUseCase } from "../../Domain/useCases/product/DeleteProduct";
import { UpdateProductUseCase } from "../../Domain/useCases/product/UpdateProduct";
import { UpdateWithImagesProductUseCase } from "../../Domain/useCases/product/UpdateWithImagesProduct";

export interface ProductContextProps {
  products: Product[];
  getProducts(id_category: string): Promise<void>;
  create(
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery>;
  updateWithImages(
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery>;
  update(product: Product): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>;
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

  const update = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await UpdateProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  };

  const updateWithImages = async (
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery> => {
    const response = await UpdateWithImagesProductUseCase(product, files);
    getProducts(product.id_category!);
    return response;
  };

  const remove = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await DeleteProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        create,
        updateWithImages,
        update,
        remove,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
