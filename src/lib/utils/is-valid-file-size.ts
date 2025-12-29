export const isValidFileSize = (file: File): boolean => {
  const MAX_FILE_SIZE = 3_000_000;

  return MAX_FILE_SIZE >= file.size;
};
