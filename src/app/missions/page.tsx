import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import MissionsPageClient from "./MissionsPageClient";

import {
  getAllMissions,
  getAllEntities,
  getAllRegions,
} from "@/lib/data-access";

export const metadata: Metadata = {
  title: "Missions — Moonwatch",
};

export default function MissionsPage() {
  const missions = getAllMissions();
  const entities = getAllEntities();
  const regions = getAllRegions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Missions"
        description="Browse all tracked lunar missions, past and future."
      />
      <MissionsPageClient
        missions={missions}
        entities={entities}
        regions={regions}
      />
    </div>
  );
}
