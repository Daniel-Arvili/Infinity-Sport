import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [7];
  const PlateWeightsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Plate Weights</h1>
      {PlateWeightsProducts && (
        <SubCategoryComponent
          Products={PlateWeightsProducts}
          PageName={"Plate Weights"}
          MainPageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars/plateweights"
          MainPageUrl="/dumbbells&bars"
        />
      )}
    </main>
  );
}
