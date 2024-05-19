import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [9];
  const KettleBellProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Kettle Bell</h1>
      {KettleBellProducts && (
        <SubCategoryComponent
          Products={KettleBellProducts}
          PageName={"Kettle Bell"}
          MainPageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars/kettlebellweights"
          MainPageUrl="/dumbbells&bars"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
