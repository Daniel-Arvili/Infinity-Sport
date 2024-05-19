import { getServerSession } from "next-auth";
import { getAddress, getExistCreditCards } from "../ServerAction/ServerAction";
import Profile from "./Profile";
import Address from "./Address";
import CreditCards from "./CreditCards";
import Return from "./Return";
import { authOptions } from "../api/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const UserAddress = await getAddress();
  const UserCreditCards = await getExistCreditCards();
  return (
    <main className="flex flex-col pt-8 pb-16 px-2 sm:px-4 w-full h-screen">
      <h1 className="mx-2">Welcome {session?.user.name}</h1>
      <div className="mt-4 mx-auto w-full sm:w-3/4 lg:w-1/2 sm:shadow-xl dark:shadow-gray-700 px-1 py-2 sm:px-2 sm:py-4 rounded-xl">
        {session ? <Profile session={session} /> : <Return />}
        {UserAddress && <Address UserAddress={UserAddress} />}
        {UserCreditCards && UserCreditCards?.length > 0 && (
          <CreditCards UserCreditCards={UserCreditCards} />
        )}
      </div>
    </main>
  );
}
