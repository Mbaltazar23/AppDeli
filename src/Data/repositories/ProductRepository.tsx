import * as ImagePicker from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import mime from "mime";
import {
  ApiDelivery,
  ApiDeliveryWithImage,
} from "../sources/remote/api/ApiDelivery";

export class ProductRepositoryImp implements ProductRepository {
  async getProductsByCategory(id_category: string): Promise<Product[]> {
    try {
      const response = await ApiDelivery.get<Product[]>(
        `/products/findByCategory/${id_category}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve([]);
    }
  }

  async create(
    product: Product,
    files: ImagePicker.ImageInfo[]
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();

      files.forEach((file) => {
        data.append("image", {
          uri: file.uri,
          // @ts-ignore
          name: file.uri.split("/").pop(),
          type: mime.getType(file.uri)!,
        });
      });

      data.append("product", JSON.stringify(product));
      const response = await ApiDeliveryWithImage.post<ResponseApiDelivery>(
        "/products/create",
        data
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
