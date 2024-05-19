import React from "react";
import Image from "next/image";
import LoadingBall from "./Gif/LoadingBall.gif";
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image src={LoadingBall} height={120} width={120} alt={`Loading Ball`} />
      <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
        Loading ...
      </p>
    </div>
  );
}
