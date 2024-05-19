import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [13];
  const StandAndRacksProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Stands & Racks</h1>
      {StandAndRacksProducts && (
        <SubCategoryComponent
          Products={StandAndRacksProducts}
          PageName={"Stands & Racks"}
          MainPageName={"Stands & Facilities"}
          PageUrl="/stand&facilities/stands&racks"
          MainPageUrl="/stand&facilities"
        />
      )}
    </main>
  );
}
