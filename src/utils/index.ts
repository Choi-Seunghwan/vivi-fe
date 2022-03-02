import stringJson from "@/data/string.json";

export const parseStr = (key: string) => {
  return stringJson[key] || String(key);
};
