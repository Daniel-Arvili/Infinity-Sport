"use client";
import React from "react";
import Image from "next/image";
import LogoWhite from "@/Logos/LogoWhite.png";
import LogoBlack from "@/Logos/LogoBlack.png";
import AvivAvatar from "@/avatars/AvivAvatar.png";
import DanielAvatar from "@/avatars/DanielAvatar.png";
import WorldMap from "./WorldConnection";
import { Fade, Zoom } from "react-awesome-reveal";
import infoLogo from "./infoLogo.png";
export default function Aboutus() {
  const teamMembers = [
    {
      name: "Aviv Hagag",
      role: "CEO",
      avatarPath: AvivAvatar,
    },
    {
      name: "Daniel Arvili",
      role: "CTO",
      avatarPath: DanielAvatar,
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Image
          src={infoLogo}
          alt="Info logo"
          className="mx-auto dark:grayscale"
          width={120}
          height={120}
        />
        <div className="md:text-center">
          <p className="text-3xl leading-8 font-extrabold capitalize">
            About Us
          </p>
          <p className="mt-2 text-base sm:text-lg font-semibold text-naivyBlue dark:text-gray-500">
            Leading To Infinty
          </p>
          <div className="mt-2 w-full sm:w-3/4 mx-auto ">
            <Zoom cascade damping={0.4}>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Infinity Sport is a leading online retail destination that
                caters to the evolving needs of fitness enthusiasts and home
                workout aficionados. Specializing in providing top-quality home
                fitness equipment and sport facilities, Infinity Sport is
                committed to bringing the gym experience to the comfort of your
                own space.
              </p>
              <p className="mt-4 text-sm font-semibold sm:text-base text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-naivySky dark:to-green-300 dark:from-glowGreen">
                Our curated selection includes a diverse range of products, from
                state-of-the-art workout machines to premium sport facilities,
                ensuring that our customers have access to the latest and most
                effective tools for their fitness journey.
              </p>
              <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                At Infinity Sport, we prioritize excellence in both product
                quality and customer satisfaction, aiming to inspire individuals
                to achieve their health and wellness goals conveniently. Whether
                you&apos;re a seasoned athlete or just starting your fitness
                journey, Infinity Sport is your go-to destination for superior
                home fitness solutions. Embrace a healthier lifestyle with
                Infinity Sport, where your fitness knows no limits.
              </p>
              <div className="hidden dark:block mt-10">
                <Image
                  src={LogoWhite}
                  alt="logo of the company"
                  className="mx-auto rounded-lg"
                  width={300}
                  height={300}
                />
                <p className="mt-4 text-lg text-gray-500"></p>
              </div>
              <div className="block dark:hidden mt-10">
                <Image
                  src={LogoBlack}
                  alt="logo of the company"
                  className="mx-auto rounded-lg"
                  width={300}
                  height={300}
                />
                <p className="mt-4 text-lg text-gray-500"></p>
              </div>
            </Zoom>
          </div>
        </div>
        <div className="mt-20">
          <div className="lg:text-center">
            <p className="mt-2 text-lg sm:text-3xl font-extrabold">
              Meet our team
            </p>
            <p className="mt-2 text-sm sm:text-base text-naivyBlue dark:text-glowGreen lg:mx-auto">
              A brief introduction to the team.
            </p>
          </div>
          <div className="flex justify-center mt-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center mx-4">
                <Image
                  src={member.avatarPath}
                  alt={member.name}
                  className="rounded-full"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-lg font-semibold">{member.name}</p>
                <p className="text-naivySky dark:text-glowGreen">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full px-1 sm:w-1/2 mx-auto pt-16">
          <Fade>
            <WorldMap />
          </Fade>
        </div>
      </div>
    </div>
  );
}
