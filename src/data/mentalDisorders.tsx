import mentalDisordersData from "@/data/mentalDisorders.json";

export interface MentalDisorder {
  id: string;
  name: string;
  category: string;
  severity: string;
  severityVariant: "destructive" | "amber" | "outline" | "secondary" | "default";
  shortDesc: string;
  fullDesc: string;
  types: { name: string; desc: string }[];
  symptoms: string[];
  handling: string;
}

export const MENTAL_DISORDERS: MentalDisorder[] = mentalDisordersData as MentalDisorder[];