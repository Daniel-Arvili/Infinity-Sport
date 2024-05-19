import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [3];
  const RowingmachineProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Rowing Machine</h1>
      {RowingmachineProducts && (
        <SubCategoryComponent
          Products={RowingmachineProducts}
          PageName={"Rowing Machine"}
          MainPageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment/rowingmachine"
          MainPageUrl="/homefitnessequipment"
        />
      )}
    </main>
  );
}
