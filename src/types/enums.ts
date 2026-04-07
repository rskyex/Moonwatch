// ---------------------------------------------------------------------------
// Moonwatch – shared enums (const objects + string literal unions)
// ---------------------------------------------------------------------------
// Using "const object + type" pattern instead of TS enums so that plain
// string literals ("planned", "crewed", etc.) are assignable to the types
// while named constants (MissionStatus.Planned) remain available.
// ---------------------------------------------------------------------------

export const MissionStatus = {
  Planned: "planned",
  InDevelopment: "in-development",
  Launched: "launched",
  InTransit: "in-transit",
  InOrbit: "in-orbit",
  OnSurface: "on-surface",
  Completed: "completed",
  Failed: "failed",
  Lost: "lost",
} as const;
export type MissionStatus = (typeof MissionStatus)[keyof typeof MissionStatus];

export const MissionType = {
  Crewed: "crewed",
  Robotic: "robotic",
  Relay: "relay",
  Supply: "supply",
  Survey: "survey",
  SampleReturn: "sample-return",
} as const;
export type MissionType = (typeof MissionType)[keyof typeof MissionType];

export const EntityType = {
  GovernmentAgency: "government-agency",
  PrivateCompany: "private-company",
  Consortium: "consortium",
  ResearchInstitution: "research-institution",
  InternationalProgram: "international-program",
} as const;
export type EntityType = (typeof EntityType)[keyof typeof EntityType];

export const InfrastructureType = {
  Lander: "lander",
  Rover: "rover",
  Habitat: "habitat",
  RelaySatellite: "relay-satellite",
  PowerSystem: "power-system",
  LaunchVehicle: "launch-vehicle",
  GatewayModule: "gateway-module",
  Communications: "communications",
  Navigation: "navigation",
  ISRU: "isru",
  Logistics: "logistics",
  SurfaceMobility: "surface-mobility",
  Other: "other",
} as const;
export type InfrastructureType =
  (typeof InfrastructureType)[keyof typeof InfrastructureType];

export const ProjectStatus = {
  Concept: "concept",
  InDevelopment: "in-development",
  Operational: "operational",
  Decommissioned: "decommissioned",
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const MilestoneType = {
  Launch: "launch",
  Landing: "landing",
  Flyby: "flyby",
  Docking: "docking",
  Deployment: "deployment",
  SampleReturn: "sample-return",
  Policy: "policy",
  Other: "other",
} as const;
export type MilestoneType = (typeof MilestoneType)[keyof typeof MilestoneType];

export const MilestoneStatus = {
  Upcoming: "upcoming",
  Achieved: "achieved",
  Delayed: "delayed",
  Cancelled: "cancelled",
} as const;
export type MilestoneStatus =
  (typeof MilestoneStatus)[keyof typeof MilestoneStatus];

export const SourceType = {
  OfficialAgency: "official-agency",
  PressRelease: "press-release",
  ResearchPaper: "research-paper",
  NewsOutlet: "news-outlet",
  ManualCuration: "manual-curation",
} as const;
export type SourceType = (typeof SourceType)[keyof typeof SourceType];

export const ReliabilityTier = {
  Primary: "primary",
  Secondary: "secondary",
  Unverified: "unverified",
} as const;
export type ReliabilityTier =
  (typeof ReliabilityTier)[keyof typeof ReliabilityTier];

export const Significance = {
  Routine: "routine",
  Notable: "notable",
  Major: "major",
  Critical: "critical",
} as const;
export type Significance = (typeof Significance)[keyof typeof Significance];

export const DateGranularity = {
  Exact: "exact",
  Month: "month",
  Quarter: "quarter",
  Year: "year",
  TBD: "tbd",
} as const;
export type DateGranularity =
  (typeof DateGranularity)[keyof typeof DateGranularity];
