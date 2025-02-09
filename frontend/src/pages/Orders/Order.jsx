import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import ContentWrapper from "../../components/ContentWrapper";

const Order = () => {
  const { id: orderId } = useParams();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const codHandler = async () => {
    try {
      const codDetails = {
        id: "COD",
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: {
          email_address: "cod@example.com",
        },
      };
      await payOrder({ orderId, details: codDetails });
      refetch();
      toast.success("Order marked as paid via Cash on Delivery");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to mark order as paid.");
    }
  };

  const payOnlineHandler = async () => {
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
      toast.error("Please fill all card details.");
      return;
    }

    try {
      const onlineDetails = {
        id: "ONLINE",
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: {
          email_address: "online@example.com",
        },
      };
      await payOrder({ orderId, details: onlineDetails });
      refetch();
      toast.success("Order marked as paid via Online Payment");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to mark order as paid.");
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="bg-[#0E1629] min-h-screen">
      <ContentWrapper>
        <div className="flex flex-col md:flex-row gap-8 px-4 mx-auto pb-8">
          <div className="md:w-2/3">
            <div className="border border-[#444444] mt-5 pb-4 mb-5">
              {order.orderItems.length === 0 ? (
                <Messsage>Order is empty</Messsage>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-[100%]">
                    <thead className="border-b-2">
                      <tr>
                        <th className="  text-lg">Image</th>
                        <th className="p-3 text-left text-lg ">Product</th>
                        <th className="p-3 text-center text-lg">Quantity</th>
                        <th className="p-3 text-lg">Unit Price</th>
                        <th className="p-3 text-lg">Total</th>
                      </tr>
                    </thead>

                    <tbody>
          {order.orderItems.map((item, index) => (
              <tr key={index}>
               <td className="p-3  items-center">
              <div className="relative group">
                <img
            src={item.image}
            alt={item.name}
            className="w-28 h-27  object-cover"
          />
         
          <div className="hidden group-hover:block mt-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto  object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-2">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
      </td>
      <td className="p-2 text-center">{item.qty}</td>
      <td className="p-2 text-center">{item.price}</td>
      <td className="p-2 text-center">
        ₹ {(item.qty * item.price).toFixed(2)}
      </td>
    </tr>
  ))}
</tbody>

                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="mt-5 border border-[#444444] p-2 pb-4 mb-4">
              <h2 className="text-xl font-bold mb-2">Shipping</h2>
              <p className="mb-4 mt-4">
                <strong className="text-[#FF2E63]">Order:</strong> {order._id}
              </p>
              <p className="mb-4">
                <strong className="text-[#FF2E63]">Name:</strong>{" "}
                {order?.user.username}
              </p>
              <p className="mb-4">
                <strong className="text-[#FF2E63]">Email:</strong>{" "}
                {order?.user.email}
              </p>
              <p className="mb-4">
                <strong className="text-[#FF2E63]">Address:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p className="mb-4">
                <strong className="text-[#FF2E63]">Method:</strong>{" "}
                Cash on Delivery
              </p>

              {order.isPaid ? (
                <button className="bg-[#2765EC] text-white w-full py-2">
                  Paid on {order.paidAt}
                </button>
              ) : (
                <button className="bg-[#db1143f3] text-white w-full py-2">
                  Not paid
                </button>
              )}
            </div>

            <div className="p-2 border border-[#444444]">
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items</span>
                <span>₹ {order.itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹ {order.shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹ {order.taxPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span>₹ {order.totalPrice}</span>
              </div>

              {!order.isPaid && (
                <>
                  <button
                    className="bg-[#db1143f3] text-white w-full py-2 mt-4"
                    onClick={codHandler}
                  >
                    Pay with Cash on Delivery
                  </button>
                  <form className="mt-4">
                  <input
  className="w-full p-2 mb-2 border text-black"
  placeholder="Card Number"
  maxLength={16} // Card number is usually 16 digits
  value={cardDetails.cardNumber}
  onChange={(e) =>
    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
  }
/>
<input
  className="w-full p-2 mb-2 border text-black"
  placeholder="Expiry Date (MM/YY)"
  maxLength={5} // Expiry date format "MM/YY" is 5 characters
  value={cardDetails.expiry}
  onChange={(e) => {
    let value = e.target.value;

    // Ensure only numbers and '/' are allowed
    value = value.replace(/[^0-9/]/g, "");

    // Insert '/' after two digits if it's not already there
    if (value.length === 2 && !value.includes("/")) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // Update the state
    setCardDetails({ ...cardDetails, expiry: value });
  }}
/>

<input
  className="w-full p-2 mb-2 border text-black"
  placeholder="CVV"
  type="password"
  maxLength={3} // CVV is usually 3 digits
  value={cardDetails.cvv}
  onChange={(e) =>
    setCardDetails({ ...cardDetails, cvv: e.target.value })
  }
/>

                    <button
                      className="bg-red-500 text-white w-full py-2"
                      type="button"
                      onClick={payOnlineHandler}
                    >
                     Online Payment
                    </button>
                  </form>
                </>
              )}
            </div>

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div>
                  <button
                    className="bg-red-500 text-white w-full py-2"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Order;
