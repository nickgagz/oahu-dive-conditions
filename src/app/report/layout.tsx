import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Dive Report",
  description:
    "Submit a shore diving condition report for Electric Beach (Kahe), West Oahu. Help other divers by sharing visibility, surge, and entry conditions.",
  openGraph: {
    title: "Add Dive Report | Oahu Dive Conditions",
    description:
      "Submit a shore diving condition report for Electric Beach (Kahe), West Oahu.",
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

