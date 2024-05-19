"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
const UserTrigger = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center space-x-3">
              <p className="text-gray-600" dir="rtl">
                {session.user.name}
              </p>
              <Image
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
                className="rounded-full"
                width={32}
                height={32}
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="shadow-lg rounded-lg p-4">
              <div className="w-32">
                <ul className="flex flex-col items-center space-y-2 text-sm sm:text-base">
                  {session.user.role === "admin" ? (
                    <li className="hover:text-naivyBlue hover:scale-105 dark:hover:text-glowGreen">
                      <Link href="/admin">Admin Panel</Link>
                    </li>
                  ) : (
                    <li className="hover:text-naivyBlue hover:scale-105 dark:hover:text-glowGreen">
                      <Link href="/orders">Your Orders</Link>
                    </li>
                  )}
                  <li className="hover:text-naivyBlue hover:scale-105 dark:hover:text-glowGreen">
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li className="hover:scale-105">
                    <ThemeSwitcher />
                  </li>
                  <Button
                    variant="destructive"
                    className="hover:scale-105"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center space-x-3">
            <p className="text-gray-600 dark:text-gray-400">Hello, guest!</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-lg rounded-lg p-4">
            <ul className="flex flex-col items-center space-y-2 text-sm sm:text-base">
              <li className="hover:text-naivyBlue dark:hover:text-glowGreen">
                <ThemeSwitcher />
              </li>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => signIn()}
              >
                Sign In
              </Button>
              <Button variant="outline" onClick={() => signIn()}>
                Sign Up
              </Button>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserTrigger;
