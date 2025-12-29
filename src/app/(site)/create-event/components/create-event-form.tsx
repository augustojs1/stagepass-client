"use client";

import React, { FormEvent } from "react";
import Image from "next/image";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Image as ImageIcon,
  Info,
  Plus,
  MapPin,
  TicketSlash,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { countries } from "@/data";
import { CreateEventFormData, createEventFormData } from "@/models";
import {
  Input,
  TextArea,
  Button,
  Select,
  ExpansionPanel,
  UploadDropZone,
} from "@/components";

export function CreateEventForm(): React.JSX.Element {
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
  const [bannerFile, setBannerFile] = React.useState<File | null>(null);

  const onSubmit = async (payload: CreateEventFormData) => {
    const formData = new FormData();
  };

  const handleSetBannerFile = (file: File): void => {
    setBannerFile(file);
  };

  const handleAddTicket = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    append({
      name: "",
      quantity: 1,
      price: 0,
    });
  };

  // Album upload logic
  const [albumFiles, setAlbumFiles] = React.useState<
    {
      previewUrl: string;
      file: File;
    }[]
  >([]);
  const albumFilesInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log("albumFiles.:", albumFiles);
  }, [albumFiles]);

  React.useEffect(() => {
    return () => {
      albumFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeAlbumFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;

    if (files && files.length > 0) {
      albumFilesInputRef.current!.files = files;

      handleFilePreview(files);
    }
  };

  const handleFilePreview = (files: FileList): void => {
    const selected = Array.from(files);

    const valid = selected.filter((file) => {
      if (!isValidFileType(file)) return false;
      if (!isValidFileSize(file)) return false;
      return true;
    });

    const mapped = valid.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setAlbumFiles((prev) => [...prev, ...mapped]);
  };

  const removeAlbumFile = (index: number) => {
    setAlbumFiles((prev) => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.previewUrl);

      return prev.filter((_, i) => i !== index);
    });
  };

  const isValidFileSize = (file: File): boolean => {
    const MAX_FILE_SIZE = 3_000_000;

    return MAX_FILE_SIZE >= file.size;
  };

  const isValidFileType = (file: File): boolean => {
    const VALID_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

    return VALID_IMAGE_MIME_TYPES.includes(file.type);
  };

  const handleFileInputClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    albumFilesInputRef.current?.click();
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
            <div className="flex flex-wrap gap-4 ">
              {albumFiles.map((albumFile, index) => (
                <div key={index} className="text-center">
                  <div className="size-[7rem] rounded-[6px] bg-gray-1 cursor-pointer">
                    <Image
                      className="w-full h-full object-contain rounded-[6px]"
                      src={albumFile.previewUrl}
                      width={112}
                      height={130}
                      alt="Banner preview"
                      priority
                    />
                  </div>
                  <p className="text-[0.8rem] text-black-3 mt-1">
                    {albumFile.file.name}
                  </p>
                </div>
              ))}
              <button
                className="size-[7rem] rounded-[6px] border border-dashed border-gray-1 flex justify-center items-center cursor-pointer"
                onClick={handleFileInputClick}
              >
                <div>
                  <Plus size={33} color="#6E7787FF" />
                </div>
              </button>
              <input
                id="album-files-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                ref={albumFilesInputRef}
                onChange={handleOnChangeAlbumFiles}
                hidden
              ></input>
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
