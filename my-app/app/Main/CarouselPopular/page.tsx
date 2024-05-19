import { getBestProducts } from "../../ServerAction/ServerAction";
import CarouselProducts from "./CarouselProducts";

export default async function Home() {
  const BestProducts = await getBestProducts();
  return (
    <div className="flex justify-center w-4/6 my-8">
      {BestProducts && <CarouselProducts BestProducts={BestProducts} />}
    </div>
  );
}
