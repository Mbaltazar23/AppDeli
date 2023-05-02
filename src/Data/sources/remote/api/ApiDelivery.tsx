import axios from "axios";
import { User } from "../../../../Domain/entities/User";
import { LocalStorage } from "../../local/LocalStorage";

const ApiDelivery = axios.create({
  //URL inicial : 192.168.1.88 
  baseURL: "http://192.168.1.163:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});

const ApiDeliveryWithImage = axios.create({
  baseURL: "http://192.168.1.163:3000/api",
  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
});

// INTERCEPTORS
ApiDelivery.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    config.headers["Authorization"] = user?.session_token;
  }
  return config;
});

ApiDeliveryWithImage.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    config.headers["Authorization"] = user?.session_token;
  }
  return config;
});

export { ApiDelivery, ApiDeliveryWithImage };
