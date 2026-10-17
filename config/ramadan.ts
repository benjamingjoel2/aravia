/**
 * Ramadan and Eid al-Fitr. Expected dates, subject to the sighting of the moon, and they can differ by a day
 * between countries. Verify every year.
 */
export const ramadan = [
  { year: 2027, start: "2027-02-08", end: "2027-03-09", eidAlFitr: "2027-03-10", verify: true },
  { year: 2028, start: "2028-01-28", end: "2028-02-26", eidAlFitr: "2028-02-27", verify: true },
] as const;
