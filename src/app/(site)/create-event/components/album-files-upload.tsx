"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

import { isValidFileSize, isValidFileType } from "@/lib/utils";

export function AlbumFilesUpload(): React.JSX.Element {
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

  return (
    <div className="flex flex-wrap gap-4">
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
  );
}
