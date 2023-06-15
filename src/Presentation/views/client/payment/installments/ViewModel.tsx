import React, { useState, useContext, useEffect } from "react";
import { GetInstallmentsMercadoPagoUseCase } from "../../../../../Domain/useCases/mercado_pago/GetInstallmentsMercadoPago";
import { ResponseMercadoPagoCardToken } from "../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";
import {
  PayerCost,
  ResponseMercadoPagoInstallments,
} from "../../../../../Data/sources/remote/models/ResponseMercadoPagoInstallments";
import { CreatePaymentMercadoPagoUseCase } from "../../../../../Domain/useCases/mercado_pago/CreatePaymentMercadoPago";
import { PaymentParams } from "../../../../../Data/sources/remote/models/PaymentParams";
import { UserConext } from "../../../../context/UserContext";
import { ResponseMercadoPagoPayment } from "../../../../../Data/sources/remote/models/ResponseMercadoPagoPayment";

interface DropDownProps {
  label: string;
  value: string;
}

const ClientPaymentInstallmentsViewModel = (
  cardToken: ResponseMercadoPagoCardToken
) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);
  const { total, shoppingBag } = useContext(ShoppingBagContext);
  const { user } = useContext(UserConext);
  const [installments, setInstallments] = useState<PayerCost[]>([]);
  const [installmentData, setInstallmentData] =
    useState<ResponseMercadoPagoInstallments>();
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState<ResponseMercadoPagoPayment>()

  useEffect(() => {
    if (installments.length > 0) {
      setDroppDownItems();
    }
  }, [installments]);

  const createPayment = async () => {
    const data: PaymentParams = {
      installments: value!,
      issuer_id: installmentData?.issuer.id!,
      payment_method_id: installmentData?.payment_method_id!,
      transaction_amount: total,
      token: cardToken.id,
      payer: {
        email: user.email,
        identification: {
          number: cardToken.cardholder.identification.number,
          type: cardToken.cardholder.identification.type,
        },
      },
      order: {
        id_client: user.id!,
        id_address: user.address?.id!,
        products: shoppingBag,
      },
    };
    setLoading(true)
    const result = await CreatePaymentMercadoPagoUseCase(data);
    setPaymentData(result.data as ResponseMercadoPagoPayment)
    setLoading(false)
    setResponseMessage(result.message);
  };

  const getInstallments = async () => {
    const result = await GetInstallmentsMercadoPagoUseCase(
      cardToken.first_six_digits,
      total
    );
    setInstallments(result.payer_costs);
    setInstallmentData(result);
  };

  const setDroppDownItems = async () => {
    let itemDeliveryMen: DropDownProps[] = [];
    installments.forEach((i) => {
      itemDeliveryMen.push({
        label: i.recommended_message,
        value: i.installments.toString(),
      });
    });
    setItems(itemDeliveryMen);
  };

  return {
    open,
    value,
    items,
    installments,
    setOpen,
    setValue,
    setItems,
    getInstallments,
    responseMessage,
    loading,
    paymentData,
    createPayment
  };
};

export default ClientPaymentInstallmentsViewModel;
