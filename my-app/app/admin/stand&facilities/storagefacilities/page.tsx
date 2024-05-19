import { getAllProducts } from "../../../ServerAction/ServerAction";
import SubCategoryComponent from "../../AdminSubCategory/SubCategoryComponent";

export default async function Home() {
  const categoriesIDs = [12];
  const StorageFacilitiesProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Storage Facilities</h1>
      {StorageFacilitiesProducts && (
        <SubCategoryComponent
          Products={StorageFacilitiesProducts}
          PageName={"Storage Facilities"}
          MainPageName={"Stands & Facilities"}
          PageUrl="/stand&facilities/storagefacilities"
          MainPageUrl="/stand&facilities"
        />
      )}
    </main>
  );
}
