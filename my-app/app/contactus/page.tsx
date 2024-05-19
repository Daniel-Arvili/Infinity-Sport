import Contactus from "./Contactus";
export default function Home() {
  return (
    <main className="flex flex-col w-full sm:w-3/5 pt-16 pb-32 px-2 mx-auto">
      <div className="flex items-center justify-center mt-4">
        <Contactus />
      </div>
    </main>
  );
}
