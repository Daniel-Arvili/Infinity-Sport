import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [11];
  const DumbbellRackProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Dumbbell Rack</h1>
      {DumbbellRackProducts && (
        <SubCategoryComponent
          Products={DumbbellRackProducts}
          PageName={"Dumbbell Rack"}
          MainPageName={"Stands & Facilities"}
          PageUrl="/stand&facilities/dumbbellrack"
          MainPageUrl="/stand&facilities"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
