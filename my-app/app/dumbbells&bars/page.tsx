import { getAllProducts, getUserCart } from "../ServerAction/ServerAction";
import CategoryComponent from "../CategoryComponent/CategoryComponent";

export default async function Home() {
  const categoriesIDs = [6, 7, 8, 9, 10];
  const dumbbellsAndBarsProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  const categories = [
    { id: "SelectHandWeights", name: "Hand Weights", value: 6 },
    { id: "SelectPlateWeights", name: "Plate Weights", value: 7 },
    { id: "SelectAnkleWeights", name: "Ankle Weights", value: 8 },
    { id: "SelectKettlebellWeights", name: "Kettlebell Weights", value: 9 },
    { id: "SelectGymBarbell", name: "Gym Barbell", value: 10 },
  ];
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Dumbbells & Bars</h1>
      {dumbbellsAndBarsProducts && (
        <CategoryComponent
          Products={dumbbellsAndBarsProducts}
          PageName={"Dumbbells & Bars"}
          PageUrl="/dumbbells&bars"
          categories={categories}
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
