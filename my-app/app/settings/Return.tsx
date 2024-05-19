"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Return() {
  const router = useRouter();
  return (
    <div className="flex justify-center py-16">
      <Button variant={"outline"} onClick={() => router.push("/")}>
        Return to Home page
      </Button>
    </div>
  );
}
