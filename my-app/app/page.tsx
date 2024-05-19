import AdsComponent from "./Main/IndexComponents/AdsComponent";
import Carousel from "./Main/CarouselPopular/page";
import PaginationPage from "./Main/PaginationComponent/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <AdsComponent />
      <Carousel />
      <PaginationPage />
    </main>
  );
}
