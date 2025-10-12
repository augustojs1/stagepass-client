import { Calendar, MapPin, Heart } from "lucide-react";

export function EventCard() {
  return (
    <div className="max-w-[650px] w-full rounded-[6px] bg-white border border-gray-5 cursor-pointer">
      <div className="w-full h-[207px] bg-gray-4 mb-[10px]">
        <p className="text-center text-white font-bold">Urban Marathon</p>
      </div>
      <div className="relative top-[-28px] px-[24px]">
        <button className="bg-white rounded-full size-8 flex justify-center items-center cursor-pointer">
          <Heart size={16} className="text-black-3" />
        </button>
      </div>
      <div className="px-[24px] pb-[22px]">
        <div className="flex justify-between mb-[14px]">
          <h4 className="text-[16px] font-bold text-black-1">Urban Marathon</h4>
          <p className="text-primary text-[14px]">From $ 20</p>
        </div>
        <div className="flex gap-2 items-center mb-[8px]">
          <Calendar size={16} className="text-primary" />
          <p className="text-primary text-[14px] font-bold self-center">
            Monday, June 06 | 06:00 AM
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <MapPin size={16} className="text-gray-3" />
          <p className="text-[14px] text-gray-3 font-[400] self-center">
            New York, NY
          </p>
        </div>
      </div>
    </div>
  );
}
