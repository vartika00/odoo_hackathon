"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
}

interface DestinationCarouselProps {
  title: string;
  destinations: Destination[];
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 border border-gray-200 transition-all"
      onClick={onClick}
    >
      <ChevronRight className="h-6 w-6 text-black" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 border border-gray-200 transition-all"
      onClick={onClick}
    >
      <ChevronLeft className="h-6 w-6 text-black" />
    </button>
  );
}

export function DestinationCarousel({ title, destinations }: DestinationCarouselProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <section className="w-full py-8 px-4 md:px-8 mx-auto max-w-7xl">
      <h2 className="text-2xl md:text-[28px] font-bold mb-6 font-black text-foreground">
        {title}
      </h2>
      <div className="relative">
        <Slider {...settings} className="-mx-2">
          {destinations.map((dest) => (
            <div key={dest.id} className="px-2 pb-4">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent via-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
