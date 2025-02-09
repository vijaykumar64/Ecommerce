import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-[#0E1629] min-h-[100vh]">
      {isLoading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-white border-collapse border border-gray-700">
              <thead className="bg-gray-800 text-sm">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Paid</th>
                  <th className="p-3 text-left">Delivered</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-700 text-sm"
                  >
                    <td className="p-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.user?.username || "N/A"}</td>
                    <td className="p-3">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>
                    <td className="p-3">₹ {order.totalPrice}</td>
                    <td className="p-3">
                      {order.isPaid ? (
                        <span className="px-2 py-1 text-xs bg-blue-500 rounded">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-500 rounded">
                          Pending...
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.isDelivered ? (
                        <span className="px-2 py-1 text-xs bg-blue-500 rounded">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-red-500 rounded">
                          Pending...
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <Link to={`/order/${order._id}`}>
                        <button className="px-3 py-1 bg-blue-500 rounded text-white">
                          More ->
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
