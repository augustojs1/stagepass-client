"use client";

import React, { FormEvent } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Image as ImageIcon,
  Info,
  MapPin,
  TicketSlash,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { countries } from "@/data";
import {
  CreateEventFormData,
  createEventFormData,
  EventCategory,
} from "@/models";
import {
  Input,
  TextArea,
  Button,
  Select,
  ExpansionPanel,
  UploadDropZone,
  MoneyInput,
} from "@/components";
import { AlbumFilesUpload } from "./album-files-upload";

type CreateEventFormProps = {
  eventCategories: EventCategory[];
};

export function CreateEventForm({
  eventCategories,
}: CreateEventFormProps): React.JSX.Element {
  const categoryOptions = eventCategories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventFormData),
    mode: "onChange",
    defaultValues: {
      event_category_id: "",
      country_id: "",
      event_tickets: [
        {
          name: "",
          quantity: 0,
          amount: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "event_tickets",
  });
  const starts_at = watch("starts_at");
  const startHour = watch("startHour");
  const ends_at = watch("ends_at");
  const endHour = watch("endHour");

  const [bannerFile, setBannerFile] = React.useState<File | null>(null);
  const [galleryImagesFiles, setGalleryImagesFiles] = React.useState<File[]>(
    []
  );
  const MAX_GALLERY_IMAGES = 6;

  React.useEffect(() => {
    void trigger(["ends_at", "endHour"]);
  }, [starts_at, startHour, trigger]);

  React.useEffect(() => {
    void trigger(["starts_at", "startHour"]);
  }, [ends_at, endHour, trigger]);

  const onSubmit = async (payload: CreateEventFormData) => {
    const formData = new FormData();

    console.log("payload.:", payload);
    console.log("bannerFile.:", bannerFile);
    console.log("galleryImagesFiles.:", galleryImagesFiles);
  };

  const handleSetBannerFile = (file: File): void => {
    setBannerFile(file);
  };

  const addGalleryImage = (file: File): void => {
    setGalleryImagesFiles((prev) => [...prev, file]);
  };

  const removeGalleryImage = (file: File): void => {
    const filteredImages = galleryImagesFiles.filter(
      (f) => f.name !== file.name
    );

    setGalleryImagesFiles(filteredImages);
  };

  const handleAddTicket = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    append({
      name: "",
      quantity: 1,
      amount: 0,
    });
  };

  const getMinDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upload cover */}
      <div id="upload-section">
        <ExpansionPanel
          title="Upload cover"
          preIcon={<ImageIcon size={22} className="text-primary" />}
        >
          <p className="text-[0.8rem] text-gray-3 mb-5">
            Upload the event cover to capture your audience&apos;s attention
          </p>
          <UploadDropZone setBannerFile={handleSetBannerFile} />
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
              name="event_category_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  placeholder="Select a category"
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.event_category_id?.message}
                ></Select>
              )}
            />
            <p className="font-bold text-[1.2rem] text-black-3 mt-4">Album</p>
            <p className="text-[0.8rem] text-gray-3 mb-2">
              Upload images for your event
            </p>
            <AlbumFilesUpload
              addGalleryImage={addGalleryImage}
              removeGalleryImage={removeGalleryImage}
              hasReachedMaximumGalleryImages={
                galleryImagesFiles.length >= MAX_GALLERY_IMAGES
              }
            />
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
                {...register("address_neighborhood")}
                error={errors.address_neighborhood?.message}
                maxLength={30}
              />
              <Input
                label="Complement"
                placeholder="Complement"
                type="text"
                {...register("address_number")}
                error={errors.address_number?.message}
                maxLength={20}
              />
            </div>
            <div className="flex flex-col justify-between gap-7 md:gap-4">
              <Input
                label="Address"
                placeholder="Address"
                type="text"
                {...register("address_street")}
                error={errors.address_street?.message}
                maxLength={30}
              />
              <Input
                label="District"
                placeholder="District"
                type="text"
                {...register("address_district")}
                error={errors.address_district?.message}
                maxLength={30}
              />
              <Controller
                name="country_id"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Country"
                    placeholder="Select a country"
                    options={countries}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.country_id?.message}
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
                min={getMinDate()}
                {...register("starts_at")}
                error={
                  touchedFields.starts_at || isSubmitted
                    ? errors.starts_at?.message
                    : undefined
                }
              />
              <Input
                label="End Date"
                type="date"
                min={getMinDate()}
                {...register("ends_at")}
                error={
                  touchedFields.ends_at || isSubmitted
                    ? errors.ends_at?.message
                    : undefined
                }
              />
            </div>
            <div className="flex flex-col gap-7 md:gap-4">
              <Input
                label="Start Time"
                type="time"
                {...register("startHour")}
                error={
                  touchedFields.startHour || isSubmitted
                    ? errors.startHour?.message
                    : undefined
                }
              />
              <Input
                label="End Time"
                placeholder="District"
                type="time"
                {...register("endHour")}
                error={
                  touchedFields.endHour || isSubmitted
                    ? errors.endHour?.message
                    : undefined
                }
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
                  {...register(`event_tickets.${index}.name`)}
                  error={errors.event_tickets?.[index]?.name?.message}
                />
                <Input
                  label="Quantity"
                  placeholder="0"
                  type="number"
                  {...register(`event_tickets.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  error={errors.event_tickets?.[index]?.quantity?.message}
                />
                <Controller
                  name={`event_tickets.${index}.amount`}
                  control={control}
                  render={({ field }) => (
                    <MoneyInput
                      label="Price"
                      placeholder="$ 0.00"
                      value={field.value ?? 0}
                      onChange={field.onChange}
                      error={errors.event_tickets?.[index]?.amount?.message}
                    />
                  )}
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
