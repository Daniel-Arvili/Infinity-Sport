import Orders from "./orders";
import { getOrders } from "../ServerAction/ServerAction";
export default async function Home() {
  const orderDetails = await getOrders();
  return (
    <main className="flex flex-col min-h-screen pt-8 pb-16 px-2 sm:px-4">
      <div className="flex items-center justify-center mt-4"></div>
      {orderDetails && <Orders orderDetails={orderDetails} />}
    </main>
  );
}
