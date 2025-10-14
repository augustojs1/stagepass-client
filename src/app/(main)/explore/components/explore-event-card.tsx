"use client";

import { Calendar, Heart, MapPin } from "lucide-react";

export function ExploreEventCard() {
  return (
    <div className=" w-full rounded-[6px] bg-white border border-gray-5 overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative">
          <div className="w-full min-h-[207px] h-full bg-gray-4 flex justify-center items-center">
            <p className="text-center text-white font-bold">Urban Marathon</p>
          </div>
          <button className="absolute top-[12px] right-[12px] bg-white rounded-full size-8 flex justify-center items-center shadow-md">
            <Heart size={16} className="text-black-3" />
          </button>
        </div>
        <div className="px-[24px] pb-[22px] flex flex-col justify-center">
          <p className="text-primary text-[14px] mb-3">From $ 20</p>
          <h4 className="text-[16px] font-bold text-black-1 mb-3">
            Urban Marathon
          </h4>
          <div className="flex gap-2 items-center mb-[8px]">
            <Calendar size={16} className="text-primary" />
            <p className="text-primary text-[14px] font-bold">
              Monday, June 06 | 06:00 AM
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={16} className="text-gray-3" />
            <p className="text-[14px] text-gray-3">New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
