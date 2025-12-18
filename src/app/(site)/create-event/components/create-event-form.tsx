"use client";

import React, { FormEvent } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Image, Info, Plus, MapPin, TicketSlash, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { countries } from "@/data";
import { CreateEventFormData, createEventFormData } from "@/models";
import { Input, TextArea, Button, Select, ExpansionPanel } from "@/components";

export function CreateEventForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventFormData),
    mode: "onChange",
    defaultValues: {
      category: "",
      country: "",
      tickets: [
        {
          name: "",
          quantity: 0,
          price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  const onSubmit = async (payload: CreateEventFormData) => {
    const formData = new FormData();
  };

  function handleAddTicket(event: MouseEvent): void {
    event.preventDefault();

    append({
      name: "",
      quantity: 1,
      price: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upload cover */}
      <div id="upload-section">
        <ExpansionPanel
          title="Upload cover"
          preIcon={<Image size={22} className="text-primary" />}
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
        </ExpansionPanel>
      </div>

      {/* General information */}
      <div id="general-section">
        <ExpansionPanel
          title="General information"
          preIcon={<Info size={22} color="#636ae8" />}
        >
          <div>
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
              label=""
              rows={4}
              placeholder="Your event description"
              {...register("description")}
              error={errors.description?.message}
              maxLength={200}
            />
            <p className="font-bold text-[1.2rem] text-black-3 mt-4">
              Category
            </p>
            <p className="text-[0.8rem] text-gray-3 mb-2">
              Choose the category for your event
            </p>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  placeholder="Select a category"
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
        </ExpansionPanel>
      </div>

      {/* Location and time */}
      <div id="location-section">
        <ExpansionPanel
          title="Location and time"
          preIcon={<MapPin size={22} color="#636ae8" />}
        >
          <p className="font-bold text-[1.2rem] text-black-3 mt-5">Location</p>
          <p className="text-[0.8rem] text-gray-3 mb-2">
            Fill your event address information
          </p>
          <div className="grid grid-cols-2 gap-8 mb-5">
            <div className="flex flex-col gap-7 md:gap-4">
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
            <div className="flex flex-col justify-between gap-7 md:gap-4">
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
                    placeholder="Select a country"
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
            <div className="flex flex-col gap-7 md:gap-4">
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
            <div className="flex flex-col gap-7 md:gap-4">
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
        </ExpansionPanel>
      </div>

      {/* Ticket */}
      <div id="ticket-section">
        <ExpansionPanel
          title="Tickets"
          preIcon={<TicketSlash size={22} color="#636ae8" />}
        >
          {fields.map((field, index) => (
            <div key={field.id}>
              <p className="font-bold text-[1.2rem] text-black-3 mt-5">
                Ticket #{index + 1}
              </p>
              <div className="flex flex-col xl:flex-row items-center xl:gap-5 gap-2 mt-2">
                <Input
                  label="Name"
                  placeholder={`Batch #${index + 1}`}
                  type="text"
                  {...register(`tickets.${index}.name`)}
                  error={errors.tickets?.[index]?.name?.message}
                />
                <Input
                  label="Quantity"
                  placeholder="0"
                  type="number"
                  {...register(`tickets.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  error={errors.tickets?.[index]?.quantity?.message}
                />
                <Input
                  label="Price $"
                  placeholder="$ 0.00"
                  type="number"
                  {...register(`tickets.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  error={errors.tickets?.[index]?.price?.message}
                />
                <div className="flex justify-center">
                  {index >= 1 ? (
                    <Button
                      variant="danger"
                      className="gap-1"
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                      }}
                    >
                      <Trash2 size={16} color="#de3b40" /> Remove
                    </Button>
                  ) : (
                    <Button variant="danger" className="invisible gap-1">
                      <Trash2 size={16} color="#de3b40" /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8 md:mt-0">
            <Button variant="secondary" onClick={handleAddTicket}>
              + Add ticket
            </Button>
          </div>
        </ExpansionPanel>
      </div>

      {/* Publish Event */}
      <div id="publish-section" className="flex justify-between mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Publish Event</Button>
      </div>
    </form>
  );
}
