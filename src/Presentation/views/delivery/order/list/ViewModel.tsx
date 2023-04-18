import React, { useState, useContext, useEffect } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserConext } from "../../../../context/UserContext";

const DeliveryOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrderByDeliveryAndStatus,
  } = useContext(OrderContext);

  const {user} = useContext(UserConext)

  const getOrders = async (idDelivery:string, status: string) => {
    const result = await getOrderByDeliveryAndStatus(idDelivery,status);
    //setOrders(result);
    console.log("ORDERS : " + JSON.stringify(result, null, 3));
  };
  return {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
    user
  };
};

export default DeliveryOrderListViewModel;
