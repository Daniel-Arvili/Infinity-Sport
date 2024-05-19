"use client";
import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavigationAccordionProps {
  setImdobileMenuOpen: (open: boolean) => void;
  url: string;
}

const NavigationAccordion: React.FC<NavigationAccordionProps> = ({
  setImdobileMenuOpen,
  url,
}) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Home fitness equipment</AccordionTrigger>
          <AccordionContent>
            <Link
              className="underline font-medium text-md"
              href={`${url}homefitnessequipment`}
            >
              <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
                Home Page
              </div>
            </Link>
            <Link href={`${url}homefitnessequipment/treadmill`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Treadmill
              </div>
            </Link>
            <Link href={`${url}homefitnessequipment/exercisebike`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Exercise Bike
              </div>
            </Link>
            <Link href={`${url}homefitnessequipment/rowingmachine`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Rowing machine
              </div>
            </Link>
            <Link href={`${url}homefitnessequipment/multitrainer`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Multi trainer
              </div>
            </Link>
            <Link href={`${url}homefitnessequipment/crossover`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Cross over
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Dumbbells & bars</AccordionTrigger>
          <AccordionContent>
            <Link
              className="underline font-medium text-md"
              href={`${url}dumbbells&bars`}
            >
              <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
                Home Page
              </div>
            </Link>
            <Link href={`${url}dumbbells&bars/handweights`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Hand Weights
              </div>
            </Link>
            <Link href={`${url}dumbbells&bars/kettlebellweights`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Kettlebell Weights
              </div>
            </Link>
            <Link href={`${url}dumbbells&bars/plateweights`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Plate Weights
              </div>
            </Link>
            <Link href={`${url}dumbbells&bars/gymbarbell`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Gym Barbell
              </div>
            </Link>
            <Link href={`${url}dumbbells&bars/ankleweights`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Ankle Weights
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Stands & Facilities</AccordionTrigger>
          <AccordionContent>
            <Link
              className="underline font-medium text-md"
              href={`${url}stand&facilities`}
            >
              <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
                Home Page
              </div>
            </Link>
            <Link href={`${url}stand&facilities/dumbbellrack`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Dumbbell Rack
              </div>
            </Link>
            <Link href={`${url}stand&facilities/stands&racks`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Stands & Racks
              </div>
            </Link>
            <Link href={`${url}stand&facilities/storagefacilities`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Storage Facilities
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Company</AccordionTrigger>
          <AccordionContent>
            <Link className="underline font-medium text-md" href={`/Aboutus`}>
              <div className="my-1" onClick={() => setImdobileMenuOpen(false)}>
                Home Page
              </div>
            </Link>
            <Link href={`/Aboutus`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                About us
              </div>
            </Link>
            <Link href={`contactus`}>
              <div
                className="my-1 text-sm"
                onClick={() => setImdobileMenuOpen(false)}
              >
                Contact us
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default NavigationAccordion;
