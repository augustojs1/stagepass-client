"use client";

import { Button } from "@/app/components/ui/form/button";
import { Calendar, MapPin } from "lucide-react";

export function EventBanner() {
  return (
    <div className="w-full bg-gray-1 p-[60px]">
      <div className="max-w-[445px] py-[45px] px-[31px] bg-white rounded-[6px]">
        <p className="text-primary text-[14px] font-bold mb-[14px]">From $8</p>
        <h2 className="text-[20px] font-bold text-black-3 mb-2">
          Brushstrokes & Beyond: An Oil Painting Odyssey
        </h2>
        <div>
          <div className="flex gap-2 items-center mb-[8px]">
            <Calendar size={16} className="text-primary" />
            <p className="text-primary text-[14px] font-bold self-center">
              Monday, June 06 | 06:00 AM
            </p>
          </div>
          <div className="flex gap-2 items-center mb-[18px]">
            <MapPin size={16} className="text-gray-3" />
            <p className="text-[14px] text-gray-3 font-[400] self-center">
              New York, NY
            </p>
          </div>
          <Button variant="primary">Purchase Ticket</Button>
        </div>
      </div>
    </div>
  );
}
