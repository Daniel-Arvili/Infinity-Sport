import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts, getUserCart } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [5];
  const ExercisebikeProducts = await getAllProducts(categoriesIDs);
  const CartItems = await getUserCart();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Exercise Bike</h1>
      {ExercisebikeProducts && (
        <SubCategoryComponent
          Products={ExercisebikeProducts}
          PageName={"Exercise Bike"}
          MainPageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment/exercisebike"
          MainPageUrl="/homefitnessequipment"
          CartItems={CartItems}
        />
      )}
    </main>
  );
}
