export const HOURS = {
  morningStart: 5,
  morningEnd: 12,
  afternoonEnd: 18,
  nightStart: 22,
} as const;

export type DayPart = "morning" | "afternoon" | "evening" | "night";

export const dayPartFor = (hour: number): DayPart => {
  if (hour >= HOURS.morningStart && hour < HOURS.morningEnd) return "morning";
  if (hour >= HOURS.morningEnd && hour < HOURS.afternoonEnd) return "afternoon";
  if (hour >= HOURS.afternoonEnd && hour < HOURS.nightStart) return "evening";
  return "night";
};

export const isDaylight = (hour: number) =>
  hour >= HOURS.morningStart && hour < HOURS.afternoonEnd;
