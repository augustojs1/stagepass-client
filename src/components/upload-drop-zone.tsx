import React from "react";
import Image from "next/image";
import { CloudUploadIcon, Trash2 } from "lucide-react";

import { Button, ErrorBadge } from "@/components";
import { isValidFileSize, isValidFileType } from "@/lib/utils";

type UploadDropZoneProps = {
  setBannerFile: (file: File) => void;
};

export function UploadDropZone({
  setBannerFile,
}: UploadDropZoneProps): React.JSX.Element {
  const [isFileBeingDragged, setIsFileBeingDragged] =
    React.useState<boolean>(false);
  const [bannerPreviewUrl, setBannerPreviewUrl] = React.useState<string | null>(
    null
  );
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(
    null
  );
  const bannerFileInputRef = React.useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [displayErrorBadge, setDisplayErrorBadge] =
    React.useState<boolean>(false);

  const hideErrorBadge = () => {
    setDisplayErrorBadge(false);
  };

  const handleFileInputClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    bannerFileInputRef.current?.click();
  };

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
      if (!isValidFileType(file)) {
        setErrorMessage(
          "Invalid file extension. Accepted file formats are: PNG, JPEG and WEBP."
        );
        setDisplayErrorBadge(true);
        return;
      }

      if (!isValidFileSize(file)) {
        setErrorMessage(
          "Invalid file size. File size must be lower or equal to 3 MB"
        );
        setDisplayErrorBadge(true);
        return;
      }

      setIsFileBeingDragged(false);
      setBannerPreviewUrl(e.target!.result as string);
      setBannerFile(file);
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
        className={`w-full sm:h-[20rem] h-[12rem] rounded-[6px] mb-2 ${
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
          accept="image/jpeg,image/png,image/webp"
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
            <div className="hidden md:block text-center">
              <p className=" text-[20px] text-gray-3 font-normal">
                Drag and drop to upload file
              </p>
              <p className="text-[20px] text-gray-3 font-normal">or</p>
            </div>
            <Button variant="primary" onClick={handleFileInputClick}>
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
      {displayErrorBadge && (
        <ErrorBadge message={errorMessage} showErrorBadge={hideErrorBadge} />
      )}
    </>
  );
}
