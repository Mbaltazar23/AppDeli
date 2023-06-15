import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { GetIdentificationTypesMercadoPagoUseCase } from "../../../../../Domain/useCases/mercado_pago/GetIdentificationTypesMercadoPago";
import { IdentificationType } from "../../../../../Domain/entities/IdentificationType";
import { CreateCardTokenMercadoPagoUseCase } from "../../../../../Domain/useCases/mercado_pago/CreateCardTokenMercadoPago";
import { CreatePaymentStripeUseCase } from "../../../../../Domain/useCases/stripe/CreatePaymentStripe";
import { CardTokenParams } from "../../../../../Data/sources/remote/models/CardTokenParams";
import { ResponseMercadoPagoCardToken } from "../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken";
// @ts-ignore
import stripe from "react-native-stripe-client";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";
import { UserConext } from "../../../../context/UserContext";
//https://www.npmjs.com/package/react-native-stripe-client

interface DropDownProps {
  label: string;
  value: string;
}

const ClientPaymentFormViewModel = () => {
  const creditCardRef = useRef() as any;
  const [values, setValues] = useState({
    brand: "",
    cvv: "",
    expiration: "",
    holder: "",
    number: "",
  });

  const stripeClient = stripe(
    "pk_test_51NJ26aKkJAUIe2sl2jbO3W0usfnDsN26z9S7WT7JHFZOIHZepUbW65SdarvTeIGVUbAcKF2LTLK43ADNezElbAqP00jBKzIokJ"
  );
  const { total , shoppingBag} = useContext(ShoppingBagContext);
  const {user} = useContext(UserConext)
  const [identificationValues, setIdentificationValues] = useState({
    identificationNumber: "",
    identificationType: "",
  });

  const [identificationTypeList, setIdentificationTypeList] = useState<
    IdentificationType[]
  >([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);
  const [cardToken, setCardToken] = useState<ResponseMercadoPagoCardToken>();

  useEffect(() => {
    onChange("identificationType", value);
  }, [value]);

  useEffect(() => {
    //console.log("VALUES FROM : " + JSON.stringify(values, null, 3));
    //console.log("IDENTIFICATION VALUES FROM : " +JSON.stringify(identificationValues, null, 3));
    if (values.cvv !== "" && values.expiration !== "" && values.number !== "") {
      createCardToken();
      //createTokenPayment();
    } else {
      console.log("DATOS INCORRECTOS : ");
    }
  }, [values]);

  const createTokenPayment = async () => {
    const response = await stripeClient.createPaymentMethod("card", {
      number: values.number.replace(/\s/g, ""),
      exp_month: parseInt(values.expiration.split("/")[0]),
      exp_year: parseInt(values.expiration.split("/")[1]),
      cvc: values.cvv,
    });

    console.log("RESPONSE STRIPE: " + JSON.stringify(response, null, 3));

    if (response.id !== undefined && response.id !== null) {
      const result = await CreatePaymentStripeUseCase(response.id, total, {
        id_client:user.id!,
        id_address:user.address?.id!,
        products: shoppingBag

      });
      console.log("RESPONSE: "+JSON.stringify(result, null, 3));
      
    }
  };

  useEffect(() => {
    setDroppDownItems();
  }, [identificationTypeList]);

  const getIdentificationTypes = async () => {
    const result = await GetIdentificationTypesMercadoPagoUseCase();
    setIdentificationTypeList(result);
  };

  const createCardToken = async () => {
    console.log("METODO CARD TOKEN");

    const data: CardTokenParams = {
      card_number: values.number.replace(/\s/g, ""),
      expiration_year: values.expiration.split("/")[1],
      expiration_month: parseInt(values.expiration.split("/")[0]),
      security_code: values.cvv,
      cardholder: {
        name: values.holder,
        identification: {
          number: identificationValues.identificationNumber,
          type: identificationValues.identificationType,
        },
      },
    };
    console.log("DATA : " + JSON.stringify(data, null, 3));

    const result = await CreateCardTokenMercadoPagoUseCase(data);
    if (result) {
      if (result.id !== "") {
        setCardToken(result);
      }
    }
    console.log("MERCADO PAGO CARD TOKEN : " + JSON.stringify(result, null, 3));
  };

  const onChange = (property: string, value: any) => {
    setIdentificationValues({ ...identificationValues, [property]: value });
  };

  const setDroppDownItems = async () => {
    let itemsIdentification: DropDownProps[] = [];
    identificationTypeList.forEach((identification) => {
      itemsIdentification.push({
        label: identification.name,
        value: identification.id!,
      });
    });
    setItems(itemsIdentification);
  };

  const handleSubmit = useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      if (error === null) {
        setValues(data);
        console.log();
      }
      console.log("ERROR: ", error);
      console.log("CARD DATA: ", data);
    }
  }, []);

  return {
    ...identificationValues,
    creditCardRef,
    identificationTypeList,
    cardToken,
    handleSubmit,
    open,
    value,
    setOpen,
    onChange,
    createCardToken,
    items,
    setValues,
    setValue,
    setItems,
    getIdentificationTypes,
  };
};

export default ClientPaymentFormViewModel;
