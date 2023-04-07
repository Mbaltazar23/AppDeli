import * as ImagePicker from "expo-image-picker";
import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
const { updateWithImages } = new ProductRepositoryImp();

export const UpdateWithImagesProductUseCase = async (
  product: Product,
  files: ImagePicker.ImageInfo[]
) => {
  return await updateWithImages(product, files);
};
