import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import ContentWrapper from "../../components/ContentWrapper";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();

  return (
    <div className="bg-[#0E1629] min-h-[100vh]">
      <ContentWrapper>
        <section className="p-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {/* Total Sales */}
            <div className="rounded-lg bg-[#080d17] p-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-[#BD7EF4] text-center p-3 mx-auto text-black">
                ₹
              </div>
              <p className="mt-5 text-gray-400">Total Sales</p>
              <h1 className="text-xl font-bold text-white">
                ₹ {isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
              </h1>
            </div>

            {/* Customers */}
            <div className="rounded-lg bg-[#080d17] p-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-[#BD7EF4] text-center p-3 mx-auto text-black">
                ₹
              </div>
              <p className="mt-5 text-gray-400">Customers</p>
              <h1 className="text-xl font-bold text-white">
                {loading ? <Loader /> : customers?.length || 0}
              </h1>
            </div>

            {/* All Orders */}
            <div className="rounded-lg bg-[#080d17] p-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-[#BD7EF4] text-center p-3 mx-auto text-black">
                ₹
              </div>
              <p className="mt-5 text-gray-400">All Orders</p>
              <h1 className="text-xl font-bold text-white">
                {loadingTwo ? <Loader /> : orders?.totalOrders || 0}
              </h1>
            </div>
          </div>

          {/* Order List */}
          <div className="mt-8 overflow-x-auto">
            <OrderList />
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
};

export default AdminDashboard;
