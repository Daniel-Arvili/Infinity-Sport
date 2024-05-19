import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [2];
  const CrossoverProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Cross Over</h1>
      {CrossoverProducts && (
        <SubCategoryComponent
          Products={CrossoverProducts}
          PageName={"Cross Over"}
          MainPageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment/crossover"
          MainPageUrl="/homefitnessequipment"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
