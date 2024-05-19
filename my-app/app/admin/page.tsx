import AdminMenu from "./AdminMenu";

export default function Home() {
  return (
    <main className="flex flex-col pt-8 pb-16 px-2 sm:px-4">
      <h1 className="mx-2">Welcome Admin</h1>
      <div className="flex items-center justify-center mt-4">
        <AdminMenu />
      </div>
    </main>
  );
}
