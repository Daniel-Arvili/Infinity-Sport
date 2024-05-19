import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";

type AuthModalProps = {
  handleAuthModal: () => void;
};

function AuthModal({ handleAuthModal }: AuthModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 dark:bg-slate-950 bg-opacity-50 dark:bg-opacity-70">
        <div className="relative w-96 my-40 mx-auto border shadow-lg rounded-md bg-white dark:bg-slate-950 z-50">
          <div className="">
            <div className="flex justify-between p-2">
              <h3 className="text-lg leading-6 font-medium text-naivyBlue dark:text-glowGreen">
                You&apos;re almost there
              </h3>
              <XMarkIcon
                className="h-6 w-6 cursor-pointer text-naivyBlue dark:text-glowGreen"
                onClick={() => handleAuthModal()}
              />
            </div>
            <Tabs defaultValue="SignUpOrGuest" className="px-2 mt-2">
              <TabsList className="">
                <TabsTrigger value="SignIn">Sign In</TabsTrigger>
                <TabsTrigger value="SignUpOrGuest">I`m New Here </TabsTrigger>
              </TabsList>
              <div className="w-full">
                <Separator />
              </div>
              <TabsContent value="SignIn">
                <div className="mt-2 px-2 py-3 text-center">
                  <p className="text-sm sm:text-base text-naivyBlue dark:text-glowGreen">
                    Welcome back, Champion !
                  </p>
                </div>
                <div className="mt-2 px-2 text-center">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Sign in to continue to your athlete&apos;s profile,
                    <br />
                    track orders, and more.
                  </p>
                </div>
                <div className="items-center px-4 py-3 text-center">
                  <Button
                    variant={"outline"}
                    className="text-naivyBlue dark:text-glowGreen"
                    onClick={() => signIn()}
                  >
                    Sign in
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="SignUpOrGuest">
                <div className="mt-2 px-2 py-3 text-center">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Sign up to join our athlete&apos;s community and unlock
                    exclusive rewards, early access to new releases, and
                    personalized gear recommendations.
                  </p>
                </div>
                <div className="items-center px-4 py-3 text-center">
                  <Button
                    variant={"outline"}
                    className="text-naivyBlue dark:text-glowGreen"
                    onClick={() => signIn()}
                  >
                    Create An Account
                  </Button>
                  <p className="text-xs sm:text-sm my-4 text-gray-600 dark:text-gray-400">
                    In a hurry? No problem, you can register later.
                  </p>
                  <Button
                    variant={"outline"}
                    className="text-naivyBlue dark:text-glowGreen"
                    onClick={() => handleAuthModal()}
                  >
                    Continue As Guest
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
