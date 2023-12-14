import React from "react";
import { useOrders } from "../hooks/useAuth";

const Order = () => {
  const { data: orders, isPending, error } = useOrders();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {orders?.map((order: any) => (
        <div key={order._id} className=''>
          <div className='flex gap-6'>
            <div>{order._id}</div>
            <div>{order.totalPrice}</div>
            <div>{order.totalPriceAfterDiscount}</div>
            <div>{order.orderStatus}</div>
          </div>

          <div>
            {order?.orderItems?.map((item: any) => (
              <div key={item._id} className='flex gap-6'>
                <div>{item.product.title}</div>
                <div>{item.color.title}</div>
                <div>{item.quantity}</div>
                <div>{item.product.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
