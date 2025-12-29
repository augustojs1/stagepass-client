export const isValidFileType = (file: File): boolean => {
  const VALID_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

  return VALID_IMAGE_MIME_TYPES.includes(file.type);
};
