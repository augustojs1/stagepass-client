"use client";

import React, { FormEvent } from "react";
import {
  ChevronDown,
  Image,
  Info,
  Plus,
  MapPin,
  TicketSlash,
} from "lucide-react";

import { Button } from "@/app/components/ui/form/button";
import { Input, TextArea } from "@/app/components";

export function CreateEventForm() {
  const [showUploadSection, setShowUploadSection] =
    React.useState<boolean>(true);

  function handleShowSection(event: FormEvent, teste: string) {
    event.preventDefault();

    setShowUploadSection(!showUploadSection);
  }

  return (
    <form>
      {/* Upload cover */}
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image size={22} className="text-primary" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              Upload cover
            </h3>
          </div>
          <button className="cursor-pointer p-2">
            <ChevronDown size={22} className="text-gray-3" />
          </button>
        </div>
        {showUploadSection ? (
          <div>
            <p className="text-[0.8rem] text-gray-3 mb-5">
              Upload the event cover to capture your audience&apos;s attention
            </p>
            <div className="w-full h-[20rem] rounded-[6px] bg-gray-1"></div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-[0.8rem] text-gray-3">image-02.png</p>
              <div className="flex gap-3">
                <Button variant="secondary">Remove</Button>
                <Button variant="primary">Change</Button>
              </div>
            </div>
          </div>
        ) : null}
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* General information */}
      <div>
        <div className="flex justify-between pt-5 mb-5">
          <div className="flex items-center gap-2">
            <Info size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              General information
            </h3>
          </div>
          <button className="cursor-pointer p-2">
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <p className="font-bold text-[1.2rem] text-black-3">
          Name <span className="text-red-3">*</span>
        </p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Make it catchy and memorable
        </p>
        <Input label="" placeholder="Joe" type="text" />
        <p className="font-bold text-[1.2rem] text-black-3 mt-4">
          Description <span className="text-red-3">*</span>
        </p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Provide essential event details
        </p>
        <TextArea rows={4} placeholder="Your event description" />
        <p className="font-bold text-[1.2rem] text-black-3 mt-4">Category</p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Choose the category for your event
        </p>
        <select name="" id="">
          <option value="">Music</option>
        </select>
        <p className="font-bold text-[1.2rem] text-black-3 mt-4">Album</p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Upload images for your event
        </p>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="size-[5.5rem] rounded-[6px] bg-gray-1 cursor-pointer"></div>
            <p className="text-[0.8rem] text-black-3 mt-1">image-02.png</p>
          </div>
          <div className="size-[5.5rem] rounded-[6px] border border-dashed border-gray-1 flex justify-center items-center  cursor-pointer">
            <Plus size={33} color="#6E7787FF" />
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* Location and time */}
      <div>
        <div className="flex justify-between pt-5 mb-5">
          <div className="flex items-center gap-2">
            <MapPin size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              Location and time
            </h3>
          </div>
          <button className="cursor-pointer p-2">
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <p className="font-bold text-[1.2rem] text-black-3">Location</p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Fill your event address information
        </p>
        <div className="grid grid-cols-2 gap-8 mb-5">
          <div className="flex flex-col gap-4">
            <Input label="Zipcode" placeholder="Zipcode" type="text" />
            <Input label="Neighborhood" placeholder="Zipcode" type="text" />
            <Input label="Number" placeholder="Number" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Input label="Address" placeholder="Address" type="text" />
            <Input label="District" placeholder="District" type="text" />
            <Input label="Country" placeholder="Country" type="text" />
          </div>
        </div>
        <p className="font-bold text-[1.2rem] text-black-3">Time</p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Choose the start time and end time for your event
        </p>
        <div className="grid grid-cols-2 gap-8 mb-5">
          <div className="flex flex-col gap-4">
            <Input label="Time Zone" placeholder="Time Zone" type="text" />
            <Input label="Start Time" placeholder="Start Time" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Input label="Event Date" placeholder="Event Date" type="text" />
            <Input label="End Time" placeholder="District" type="text" />
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* Ticket */}
      <div>
        <div className="flex justify-between pt-5 mb-5">
          <div className="flex items-center gap-2">
            <TicketSlash size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">Ticket</h3>
          </div>
          <button className="cursor-pointer p-2">
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-5">
          <div className="flex flex-col gap-4">
            <Input label="Quantity" placeholder="Quantity" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Input label="Price" placeholder="Price" type="text" />
          </div>
        </div>
        <p className="font-bold text-[1.2rem] text-black-3 mt-4">Sale date</p>
        <p className="text-[0.8rem] text-gray-3 mb-2">
          Set the sale time when your audience is able to purchase the tickets
        </p>
        <div className="grid grid-cols-2 gap-8 mb-5">
          <div className="flex flex-col gap-4">
            <Input label="Time Zone" placeholder="Time Zone" type="text" />
            <Input label="Start Time" placeholder="Start Time" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <Input label="Event Date" placeholder="Event Date" type="text" />
            <Input label="End Time" placeholder="District" type="text" />
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Publish Event</Button>
      </div>
    </form>
  );
}
