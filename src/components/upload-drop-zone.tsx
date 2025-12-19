import React from "react";
import Image from "next/image";
import { CloudUploadIcon, Trash2 } from "lucide-react";

import { Button } from "./ui/form/button";

export function UploadDropZone(): React.JSX.Element {
  const [isFileBeingDragged, setIsFileBeingDragged] =
    React.useState<boolean>(false);
  const [bannerPreviewUrl, setBannerPreviewUrl] = React.useState<string | null>(
    null
  );
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(
    null
  );
  const bannerFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOnFileDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      bannerFileInputRef.current!.files = files;

      handleFilePreview(files[0]);
    }
  };

  const handleFilePreview = (file: File): void => {
    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      if (isValidFileType(file)) {
        setIsFileBeingDragged(false);
        setBannerPreviewUrl(e.target!.result as string);
      }
    };
  };

  const handleBannerFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      bannerFileInputRef.current!.files = files;

      handleFilePreview(files[0]);
    }
  };

  const isValidFileType = (file: File): boolean => {
    return true;
  };

  const changeBannerPreviewFile = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    bannerFileInputRef.current?.click();
  };

  const removeBannerPreviewFile = (): void => {
    setBannerPreviewUrl(null);
    setSelectedFileName(null);
  };

  return (
    <>
      <div
        className={`w-full sm:h-[20rem] h-[12rem] rounded-[6px] ${
          !bannerPreviewUrl ? " border-2 border-primary border-dashed" : ""
        } ${isFileBeingDragged ? "bg-gray-6 opacity-60" : ""}`}
        onDragEnter={(e) => {
          setIsFileBeingDragged(true);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          setIsFileBeingDragged(false);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOnFileDrop(e);
        }}
      >
        <input
          id="banner-file-input"
          type="file"
          ref={bannerFileInputRef}
          onChange={handleBannerFileChange}
          hidden
        ></input>
        {bannerPreviewUrl ? (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <Image
              className="w-full h-full object-contain"
              src={bannerPreviewUrl}
              width={60}
              height={53}
              alt="Banner preview"
              priority
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-2">
            <CloudUploadIcon size={48} color="#636ae8" />
            <p className="text-[20px] text-gray-3 font-normal">
              Drag and drop to upload file
            </p>
            <p className="text-[20px] text-gray-3 font-normal">or</p>
            <Button
              variant="primary"
              onClick={() => {
                bannerFileInputRef.current?.click();
              }}
            >
              Browse File
            </Button>
          </div>
        )}
      </div>
      {bannerPreviewUrl ? (
        <div className="flex items-center justify-between mt-6">
          <p className="text-[0.8rem] text-gray-3">{selectedFileName}</p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              className="gap-1"
              onClick={(e) => {
                e.preventDefault();
                removeBannerPreviewFile();
              }}
            >
              <Trash2 size={16} color="#de3b40" /> Remove
            </Button>
            <Button variant="secondary" onClick={changeBannerPreviewFile}>
              Change
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
