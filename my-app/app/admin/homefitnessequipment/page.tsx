import CategoryComponent from "../AdminCategory/CategoryComponent";
import { getAllProducts } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [1, 2, 3, 4, 5];
  const HomeFitnessProducts = await getAllProducts(categoriesIDs);
  const categories = [
    { id: "SelectTreadmill", name: "Treadmill", value: 1 },
    { id: "SelectCrossOver", name: "Cross Over", value: 2 },
    { id: "SelectRowingMachine", name: "Rowing Machine", value: 3 },
    { id: "SelectMultiTrainer", name: "Multi Trainer", value: 4 },
    { id: "SelectExerciseBike", name: "Exercise Bike", value: 5 },
  ];
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Home Fitness Equipment</h1>
      {HomeFitnessProducts && (
        <CategoryComponent
          Products={HomeFitnessProducts}
          PageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment"
          categories={categories}
        />
      )}
    </main>
  );
}
