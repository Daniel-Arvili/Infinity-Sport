import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [10];
  const GymBarbellProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Gym Barbell</h1>
      {GymBarbellProducts && (
        <SubCategoryComponent
          Products={GymBarbellProducts}
          PageName={"Gym Barbell"}
          MainPageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars/gymbarbell"
          MainPageUrl="/dumbbells&bars"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
