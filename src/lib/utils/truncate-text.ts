export const truncateText = (text: string, sizeLimit: number): string => {
  if (text.length > sizeLimit) {
    return text.slice(0, sizeLimit) + "...";
  }

  return text;
};
