import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [1];
  const TreadmillProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Treadmill</h1>
      {TreadmillProducts && (
        <SubCategoryComponent
          Products={TreadmillProducts}
          PageName={"Treadmill"}
          MainPageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment/treadmill"
          MainPageUrl="/homefitnessequipment"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
