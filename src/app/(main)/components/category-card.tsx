"use client";

import { Music, Bike, Palette, BriefcaseBusiness, Camera } from "lucide-react";

type CategoryCardProps = {
  category: "music" | "sport" | "exhibition" | "business" | "photography";
};

export function CategoryCard({ category }: CategoryCardProps) {
  const icons = {
    music: <Music size="40" className="text-primary" />,
    sport: <Bike size="40" className="text-primary" />,
    exhibition: <Palette size="40" className="text-primary" />,
    business: <BriefcaseBusiness size="40" className="text-primary" />,
    photography: <Camera size="40" className="text-primary" />,
  };

  return (
    <div className="max-w-[211px] w-full bg-gray-6 py-[37px] full rounded-[6px] flex flex-col justify-center items-center gap-2 cursor-pointer">
      {icons[category]}
      <p className="text-black-3 text-[14px] font-bold capitalize">
        {category}
      </p>
    </div>
  );
}
