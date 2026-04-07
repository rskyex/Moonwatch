// ---------------------------------------------------------------------------
// Moonwatch – site configuration
// ---------------------------------------------------------------------------

export interface NavItem {
  name: string;
  href: string;
  description: string;
}

export const siteConfig = {
  siteName: "Moonwatch",
  siteDescription: "A structured observatory for lunar exploration",
  tagline: "Tracking every mission to the Moon",
} as const;

export const navigation: NavItem[] = [
  {
    name: "Overview",
    href: "/",
    description: "Dashboard summarising the current state of lunar exploration",
  },
  {
    name: "Activity",
    href: "/activity",
    description: "Latest updates and news across all tracked missions",
  },
  {
    name: "Missions",
    href: "/missions",
    description: "Complete catalogue of past, present, and future lunar missions",
  },
  {
    name: "Entities",
    href: "/entities",
    description: "Agencies, companies, and organisations involved in lunar exploration",
  },
  {
    name: "Infrastructure",
    href: "/infrastructure",
    description: "Hardware, vehicles, and systems supporting lunar operations",
  },
  {
    name: "Timeline",
    href: "/timeline",
    description: "Chronological milestones in the return to the Moon",
  },
  {
    name: "Methodology",
    href: "/methodology",
    description: "How Moonwatch sources, verifies, and curates its data",
  },
];
