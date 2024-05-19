"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoBlack from "../../Logos/LogoBlack.png";

export default function LogoChoose() {
  return (
    <>
      <Link href={"/"}>
        <Image
          src={LogoBlack}
          alt={"LogoBlack"}
          priority={true}
          width={90}
          height={90}
          className="dark:invert"
        />
      </Link>
    </>
  );
}
