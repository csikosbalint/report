import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatTime = (minutes, size = "l", locale = "hu") => {
  const formattedTime = minutes + " perces";
  if (size === "xs" || size === "s" || size === 'm') {
    return minutes + "\"";
  }
  return formattedTime;
};

export const formatDate = (date, size = "l", locale = "hu") => {
  let formattedDate = new Date(date).toLocaleDateString(locale);
  if (size === "xs" || size === "s" || size === 'm') {
    const shortDate = new Date(date).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    });
    formattedDate = shortDate
  }
  return formattedDate
};

export const getInitials = (name="J Doe") => {
  const words = name.split(" ");
  return words.map(word => word.charAt(0).toUpperCase()).join("");
};
