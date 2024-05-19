import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [8];
  const AnkleWeightsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Ankle Weights</h1>
      {AnkleWeightsProducts && (
        <SubCategoryComponent
          Products={AnkleWeightsProducts}
          PageName={"Ankle Weights"}
          MainPageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars/ankleweights"
          MainPageUrl="/dumbbells&bars"
        />
      )}
    </main>
  );
}
