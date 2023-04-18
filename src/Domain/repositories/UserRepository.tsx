import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from "expo-image-picker";

export interface UserRepository {
  getDeliveryMen(): Promise<User[]>;

  update(user: User): Promise<ResponseApiDelivery>;
  updateWithImages(
    user: User,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDelivery>;
}
