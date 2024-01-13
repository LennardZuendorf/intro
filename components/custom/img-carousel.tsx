"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ImgCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
};

export const ImgCarousel: React.FC<ImgCarouselProps> = ({
  images,
  className,
  alt,
}) => {
  return (
    <div className="w-full px-8  justify-center items-center">
      <Carousel
        orientation="horizontal"
        className="flex justify-center justify-self-center"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={alt.concat("-", index.toString())}
                width={780}
                height={500}
                className="my-8 rounded-md border bg-muted transition-colors"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
