export const shortenString = (str: string, limit: number): string => {
  return str.length <= limit ? str : str.slice(0, limit) + "...";
};
