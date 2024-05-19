import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [6];
  const HandWeightsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Hand Weights</h1>
      {HandWeightsProducts && (
        <SubCategoryComponent
          Products={HandWeightsProducts}
          PageName={"Hand Weights"}
          MainPageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars/handweights"
          MainPageUrl="/dumbbells&bars"
        />
      )}
    </main>
  );
}
