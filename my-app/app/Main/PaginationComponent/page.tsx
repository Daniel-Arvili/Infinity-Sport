import {
  getAllTheProducts,
  getUserCart,
} from "../../ServerAction/ServerAction";
import PaginationPage from "./PaginationPage";

export default async function Home() {
  const AllProducts = await getAllTheProducts();
  const CartItems = await getUserCart();
  return (
    <div className="flex justify-center w-full sm:w-5/6">
      {AllProducts && (
        <PaginationPage AllProducts={AllProducts} CartItems={CartItems} />
      )}
    </div>
  );
}
