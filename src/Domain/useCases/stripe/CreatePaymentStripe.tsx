import { Order } from "../../entities/Order";
import { StripeRepositoryImpl } from "../../../Data/repositories/StripeRepository";

const { createPayment } = new StripeRepositoryImpl();

export const CreatePaymentStripeUseCase = async (
  id: string,
  amount: number,
  order: Order
) => {
  return await createPayment(id, amount, order);
};
