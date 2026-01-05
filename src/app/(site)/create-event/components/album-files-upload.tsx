"use client";

import React from "react";
import Image from "next/image";
import { Plus, XCircle } from "lucide-react";

import { ErrorBadge } from "@/components";
import { isValidFileSize, isValidFileType } from "@/lib/utils";
import { truncateText } from "@/lib";

type AlbumFilesUploadProps = {
  addGalleryImage: (file: File) => void;
  removeGalleryImage: (file: File) => void;
  hasReachedMaximumGalleryImages: boolean;
};

export function AlbumFilesUpload({
  addGalleryImage,
  removeGalleryImage,
  hasReachedMaximumGalleryImages,
}: AlbumFilesUploadProps): React.JSX.Element {
  const [albumFiles, setAlbumFiles] = React.useState<
    {
      previewUrl: string;
      file: File;
    }[]
  >([]);
  const albumFilesInputRef = React.useRef<HTMLInputElement>(null);
  const [displayErrorBadge, setDisplayErrorBadge] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const hideErrorBadge = () => {
    setDisplayErrorBadge(false);
  };

  React.useEffect(() => {
    return () => {
      albumFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileInputClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    albumFilesInputRef.current?.click();
  };

  const handleOnChangeAlbumFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;

    if (files && files.length > 0) {
      albumFilesInputRef.current!.files = files;

      handleFilePreview(files);

      addGalleryImage(files[0]);
    }
  };

  const handleFilePreview = (files: FileList): void => {
    const selected = Array.from(files);

    const valid = selected.filter((file) => {
      if (!isValidFileType(file)) {
        setErrorMessage(
          "Invalid file extension. Accepted file formats are: PNG, JPEG and WEBP."
        );
        setDisplayErrorBadge(true);
        return false;
      }

      if (!isValidFileSize(file)) {
        setErrorMessage(
          "Invalid file size. File size must be lower or equal to 3 MB"
        );
        setDisplayErrorBadge(true);
        return false;
      }

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

    removeGalleryImage(albumFiles[index].file);
  };

  return (
    <>
      <div className="flex flex-wrap max-w-full gap-4 mb-3">
        {albumFiles.map((albumFile, index) => (
          <div key={index} className="relative">
            <div className="absolute top-[-9px] right-[-4px]">
              <button
                className="cursor-pointer rounded-full bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  removeAlbumFile(index);
                }}
              >
                <XCircle size={20} color="#de3b40" />
              </button>
            </div>
            <div className="text-center">
              <div className="size-[7rem] rounded-[6px] bg-gray-1 cursor-pointer">
                <Image
                  className="w-full h-full object-contain rounded-[6px]"
                  src={albumFile.previewUrl}
                  width={112}
                  height={130}
                  alt="Album file preview"
                />
              </div>
              <p className="text-[0.8rem] text-black-3 mt-1">
                {truncateText(albumFile.file.name, 10)}
              </p>
            </div>
          </div>
        ))}
        {!hasReachedMaximumGalleryImages && (
          <button
            className="size-[7rem] rounded-[6px] border border-dashed border-gray-1 flex justify-center items-center cursor-pointer"
            onClick={handleFileInputClick}
          >
            <div>
              <Plus size={33} color="#6E7787FF" />
            </div>
          </button>
        )}
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
      {displayErrorBadge && (
        <ErrorBadge message={errorMessage} showErrorBadge={hideErrorBadge} />
      )}
    </>
  );
}
