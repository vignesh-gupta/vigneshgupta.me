import { clsx, type ClassValue } from "clsx";
import { Duration } from "sanity.types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateYearsFromNov2021 = () => {
  const startDate = new Date("2021-11-01");
  const currentDate = new Date();
  const diff = currentDate.getTime() - startDate.getTime();

  const years = diff / (1000 * 60 * 60 * 24 * 365);

  return Math.floor(years) < years
    ? Math.floor(years) + "+"
    : Math.floor(years).toString();
};

export const formatDuration = (
  duration: Duration | null,
  isPresent: boolean | null
) => {
  if (!duration || !duration.start) {
    return { period: "N/A", duration: "N/A" };
  }

  const start = new Date(duration?.start);
  let end = new Date();

  if (!isPresent && duration.end) {
    end = new Date(duration.end);
  }

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startYear = start.getFullYear();
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endYear = end.getFullYear();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let durationText = "";
  if (years > 0) {
    durationText += `${years} yr${years > 1 ? "s" : ""}`;
  }
  if (remainingMonths > 0) {
    if (durationText) durationText += " ";
    durationText += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
  }

  const period = isPresent
    ? `${startMonth} ${startYear} - Present`
    : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;

  return { period, duration: durationText || "1 mo" };
};
