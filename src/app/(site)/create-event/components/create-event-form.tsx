"use client";

import React, { FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ChevronDown,
  Image,
  Info,
  Plus,
  MapPin,
  TicketSlash,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/form/button";
import { Input, TextArea } from "@/components";
import { Select } from "@/components/ui/form/select";
import { CreateEventFormData, createEventFormData } from "@/models";
import { countries } from "@/data";

type Sections = {
  upload: boolean;
  generalInformation: boolean;
  locationAndTime: boolean;
  ticket: boolean;
};

export function CreateEventForm() {
  const [showUploadSection, setShowUploadSection] =
    React.useState<boolean>(true);

  const [showSection, setShowCategory] = React.useState<Sections>({
    generalInformation: true,
    locationAndTime: true,
    ticket: true,
    upload: true,
  });

  const handleShowSection = (section: keyof Sections) => {
    event?.preventDefault();

    setShowCategory((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventFormData),
    mode: "onChange",
  });

  const onSubmit = async (payload: CreateEventFormData) => {
    const formData = new FormData();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upload cover */}
      <div id="upload-section">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image size={22} className="text-primary" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              Upload cover
            </h3>
          </div>
          <button
            className="cursor-pointer p-2"
            onClick={() => {
              handleShowSection("upload");
            }}
          >
            <ChevronDown size={22} className="text-gray-3" />
          </button>
        </div>
        <div
          className={`
      transition-all duration-300 ease-in-out overflow-hidden
      ${showSection.upload ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
      `}
        >
          <p className="text-[0.8rem] text-gray-3 mb-5">
            Upload the event cover to capture your audience&apos;s attention
          </p>
          <div className="w-full sm:h-[20rem] h-[12rem] rounded-[6px] bg-gray-1"></div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-[0.8rem] text-gray-3">image-02.png</p>
            <div className="flex gap-3">
              <Button variant="danger" className="gap-1">
                <Trash2 size={16} color="#de3b40" /> Remove
              </Button>
              <Button variant="secondary">Change</Button>
            </div>
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* General information */}
      <div id="general-section">
        <div className="flex justify-between pt-5">
          <div className="flex items-center gap-2">
            <Info size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              General information
            </h3>
          </div>
          <button
            className="cursor-pointer p-2"
            onClick={() => {
              handleShowSection("generalInformation");
            }}
          >
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden px-2 ${
            showSection.generalInformation
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }
      `}
        >
          <p className="font-bold text-[1.2rem] text-black-3 mt-5">
            Name <span className="text-red-3">*</span>
          </p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Make it catchy and memorable
          </p>
          <Input
            label=""
            placeholder="Your event name"
            type="text"
            {...register("name")}
            error={errors.name?.message}
            maxLength={30}
          />
          <p className="font-bold text-[1.2rem] text-black-3 mt-4">
            Description <span className="text-red-3">*</span>
          </p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Provide essential event details
          </p>
          <TextArea
            rows={4}
            placeholder="Your event description"
            {...register("description")}
            error={errors.description?.message}
            maxLength={200}
          />
          <p className="font-bold text-[1.2rem] text-black-3 mt-4">Category</p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Choose the category for your event
          </p>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                label="Category"
                placeholder="Category"
                options={[
                  {
                    label: "Music",
                    value: "music",
                  },
                  {
                    label: "Business",
                    value: "business",
                  },
                  {
                    label: "Photograpy",
                    value: "photography",
                  },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
              ></Select>
            )}
          />
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
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* Location and time */}
      <div id="location-section">
        <div className="flex justify-between pt-5">
          <div className="flex items-center gap-2">
            <MapPin size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">
              Location and time
            </h3>
          </div>
          <button
            className="cursor-pointer p-2"
            onClick={() => {
              handleShowSection("locationAndTime");
            }}
          >
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <div
          className={`
      transition-all duration-300 ease-in-out overflow-hidden px-2 mb-5
      ${
        showSection.locationAndTime
          ? "max-h-[1000px] opacity-100"
          : "max-h-0 opacity-0"
      }
      `}
        >
          <p className="font-bold text-[1.2rem] text-black-3 mt-5">Location</p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Fill your event address information
          </p>
          <div className="grid grid-cols-2 gap-8 mb-5">
            <div className="flex flex-col gap-4">
              <Input
                label="Zipcode"
                placeholder="Zipcode"
                type="text"
                {...register("zipcode")}
                error={errors.zipcode?.message}
                maxLength={10}
              />
              <Input
                label="Neighborhood"
                placeholder="Neighborhood"
                type="text"
                {...register("neighborhood")}
                error={errors.neighborhood?.message}
                maxLength={30}
              />
              <Input
                label="Complement"
                placeholder="Complement"
                type="text"
                {...register("number")}
                error={errors.number?.message}
                maxLength={20}
              />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <Input
                label="Address"
                placeholder="Address"
                type="text"
                {...register("address")}
                error={errors.address?.message}
                maxLength={30}
              />
              <Input
                label="District"
                placeholder="District"
                type="text"
                {...register("district")}
                error={errors.district?.message}
                maxLength={30}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Country"
                    placeholder="Country"
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.country?.message}
                  />
                )}
              />
            </div>
          </div>
          <p className="font-bold text-[1.2rem] text-black-3">Time</p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Choose the start time and end time for your event
          </p>
          <div className="grid grid-cols-2 gap-8 mb-5">
            <div className="flex flex-col gap-4">
              <Input
                label="Start Date"
                type="date"
                {...register("startDate")}
                error={errors.startDate?.message}
              />
              <Input
                label="End Date"
                type="date"
                {...register("endDate")}
                error={errors.endDate?.message}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Start Time"
                type="time"
                {...register("startHour")}
                error={errors.startHour?.message}
              />
              <Input
                label="End Time"
                placeholder="District"
                type="time"
                {...register("endHour")}
                error={errors.endHour?.message}
              />
            </div>
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* Ticket */}
      <div id="ticket-section">
        <div className="flex justify-between pt-5">
          <div className="flex items-center gap-2">
            <TicketSlash size={22} color="#636ae8" />
            <h3 className="font-bold text-[1.5rem] text-black-3">Ticket</h3>
          </div>
          <button
            className="cursor-pointer p-2"
            onClick={() => {
              handleShowSection("ticket");
            }}
          >
            <ChevronDown size={22} color="#6e7787" />
          </button>
        </div>
        <div
          className={`
      transition-all duration-300 ease-in-out overflow-hidden mb-5 px-2
      ${showSection.ticket ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
      `}
        >
          <div className="grid grid-cols-2 gap-8 mt-5">
            <div className="flex flex-col gap-4">
              <Input label="Quantity" placeholder="0" type="number" />
            </div>
            <div className="flex flex-col gap-4">
              <Input label="Price $" placeholder="$ xx" type="number" />
            </div>
          </div>
        </div>
        <hr className="text-gray-5 mt-[1.2rem]" />
      </div>

      {/* Publish Event */}
      <div id="publish-section" className="flex justify-between mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Publish Event</Button>
      </div>
    </form>
  );
}
