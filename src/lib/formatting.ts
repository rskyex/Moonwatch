// ---------------------------------------------------------------------------
// Moonwatch – display formatting utilities
// ---------------------------------------------------------------------------

import {
  DateGranularity,
  EntityType,
  InfrastructureType,
  MilestoneStatus,
  MissionStatus,
  ProjectStatus,
  Significance,
} from "@/types";

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format an ISO-8601 date string respecting the given granularity.
 *
 * - exact  → "7 April 2026"
 * - month  → "March 2026"
 * - quarter → "Q1 2026"
 * - year   → "2026"
 * - tbd    → "TBD"
 */
export function formatDate(
  dateStr: string,
  granularity: DateGranularity = DateGranularity.Exact,
): string {
  if (granularity === DateGranularity.TBD) return "TBD";

  const d = new Date(dateStr);
  const year = d.getUTCFullYear();

  switch (granularity) {
    case DateGranularity.Year:
      return `${year}`;
    case DateGranularity.Quarter: {
      const q = Math.ceil((d.getUTCMonth() + 1) / 3);
      return `Q${q} ${year}`;
    }
    case DateGranularity.Month:
      return `${MONTH_NAMES[d.getUTCMonth()]} ${year}`;
    case DateGranularity.Exact:
    default:
      return `${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()]} ${year}`;
  }
}

// ---------------------------------------------------------------------------
// Mission status
// ---------------------------------------------------------------------------

const missionStatusLabels: Record<MissionStatus, string> = {
  [MissionStatus.Planned]: "Planned",
  [MissionStatus.InDevelopment]: "In Development",
  [MissionStatus.Launched]: "Launched",
  [MissionStatus.InTransit]: "In Transit",
  [MissionStatus.InOrbit]: "In Orbit",
  [MissionStatus.OnSurface]: "On Surface",
  [MissionStatus.Completed]: "Completed",
  [MissionStatus.Failed]: "Failed",
  [MissionStatus.Lost]: "Lost",
};

export function getMissionStatusLabel(status: MissionStatus): string {
  return missionStatusLabels[status] ?? status;
}

const missionStatusColors: Record<MissionStatus, string> = {
  [MissionStatus.Completed]: "text-green-600 bg-green-50",
  [MissionStatus.OnSurface]: "text-green-600 bg-green-50",
  [MissionStatus.Launched]: "text-blue-600 bg-blue-50",
  [MissionStatus.InTransit]: "text-blue-600 bg-blue-50",
  [MissionStatus.InOrbit]: "text-blue-600 bg-blue-50",
  [MissionStatus.Planned]: "text-amber-600 bg-amber-50",
  [MissionStatus.InDevelopment]: "text-amber-600 bg-amber-50",
  [MissionStatus.Failed]: "text-red-600 bg-red-50",
  [MissionStatus.Lost]: "text-red-600 bg-red-50",
};

export function getMissionStatusColor(status: MissionStatus): string {
  return missionStatusColors[status] ?? "text-slate-600 bg-slate-50";
}

// ---------------------------------------------------------------------------
// Significance
// ---------------------------------------------------------------------------

const significanceLabels: Record<Significance, string> = {
  [Significance.Routine]: "Routine",
  [Significance.Notable]: "Notable",
  [Significance.Major]: "Major",
  [Significance.Critical]: "Critical",
};

export function getSignificanceLabel(sig: Significance): string {
  return significanceLabels[sig] ?? sig;
}

const significanceColors: Record<Significance, string> = {
  [Significance.Critical]: "text-red-600 bg-red-50",
  [Significance.Major]: "text-amber-600 bg-amber-50",
  [Significance.Notable]: "text-blue-600 bg-blue-50",
  [Significance.Routine]: "text-slate-600 bg-slate-50",
};

export function getSignificanceColor(sig: Significance): string {
  return significanceColors[sig] ?? "text-slate-600 bg-slate-50";
}

// ---------------------------------------------------------------------------
// Entity type
// ---------------------------------------------------------------------------

const entityTypeLabels: Record<EntityType, string> = {
  [EntityType.GovernmentAgency]: "Government Agency",
  [EntityType.PrivateCompany]: "Private Company",
  [EntityType.Consortium]: "Consortium",
  [EntityType.ResearchInstitution]: "Research Institution",
  [EntityType.InternationalProgram]: "International Program",
};

export function getEntityTypeLabel(type: EntityType): string {
  return entityTypeLabels[type] ?? type;
}

// ---------------------------------------------------------------------------
// Infrastructure type
// ---------------------------------------------------------------------------

const infrastructureTypeLabels: Record<InfrastructureType, string> = {
  [InfrastructureType.Lander]: "Lander",
  [InfrastructureType.Rover]: "Rover",
  [InfrastructureType.Habitat]: "Habitat",
  [InfrastructureType.RelaySatellite]: "Relay Satellite",
  [InfrastructureType.PowerSystem]: "Power System",
  [InfrastructureType.LaunchVehicle]: "Launch Vehicle",
  [InfrastructureType.GatewayModule]: "Gateway Module",
  [InfrastructureType.Communications]: "Communications",
  [InfrastructureType.Navigation]: "Navigation",
  [InfrastructureType.ISRU]: "ISRU",
  [InfrastructureType.Logistics]: "Logistics",
  [InfrastructureType.SurfaceMobility]: "Surface Mobility",
  [InfrastructureType.Other]: "Other",
};

export function getInfrastructureTypeLabel(type: InfrastructureType): string {
  return infrastructureTypeLabels[type] ?? type;
}

// ---------------------------------------------------------------------------
// Project status
// ---------------------------------------------------------------------------

const projectStatusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.Concept]: "text-slate-600 bg-slate-50",
  [ProjectStatus.InDevelopment]: "text-amber-600 bg-amber-50",
  [ProjectStatus.Operational]: "text-green-600 bg-green-50",
  [ProjectStatus.Decommissioned]: "text-red-600 bg-red-50",
};

export function getProjectStatusColor(status: ProjectStatus): string {
  return projectStatusColors[status] ?? "text-slate-600 bg-slate-50";
}

// ---------------------------------------------------------------------------
// Milestone status
// ---------------------------------------------------------------------------

const milestoneStatusColors: Record<MilestoneStatus, string> = {
  [MilestoneStatus.Upcoming]: "text-blue-600 bg-blue-50",
  [MilestoneStatus.Achieved]: "text-green-600 bg-green-50",
  [MilestoneStatus.Delayed]: "text-amber-600 bg-amber-50",
  [MilestoneStatus.Cancelled]: "text-red-600 bg-red-50",
};

export function getMilestoneStatusColor(status: MilestoneStatus): string {
  return milestoneStatusColors[status] ?? "text-slate-600 bg-slate-50";
}
