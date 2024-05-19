import { getAllProducts, getUserCart } from "../ServerAction/ServerAction";
import CategoryComponent from "../CategoryComponent/CategoryComponent";

export default async function Home() {
  const categoriesIDs = [11, 12, 13];
  const StandAndFacilitiesProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  const categories = [
    { id: "SelectDumbbellRack", name: "Dumbbell Rack", value: 11 },
    { id: "SelectStorageFacilities", name: "Storage Facilities", value: 12 },
    { id: "SelectStandsAndRacks", name: "Stands & Racks", value: 13 },
  ];
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Stands & Facilities</h1>
      {StandAndFacilitiesProducts && (
        <CategoryComponent
          Products={StandAndFacilitiesProducts}
          PageName={"Stands & Facilities"}
          PageUrl="/stand&facilities"
          categories={categories}
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
