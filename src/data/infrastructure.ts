// ---------------------------------------------------------------------------
// Moonwatch – mock infrastructure data
// ---------------------------------------------------------------------------

import type { InfrastructureProject } from "@/types";

const TS = "2026-01-15T00:00:00Z";

export const infrastructure: InfrastructureProject[] = [
  {
    id: "sls",
    slug: "sls",
    name: "Space Launch System (SLS)",
    type: "launch-vehicle",
    status: "operational",
    description:
      "The Space Launch System is NASA's super-heavy-lift rocket designed to send the Orion spacecraft and crew beyond low Earth orbit. SLS Block 1 can deliver over 27 metric tons to trans-lunar injection. It flew successfully on Artemis I in November 2022 and is the primary launch vehicle for all crewed Artemis missions.",
    entityIds: ["nasa"],
    missionIds: ["artemis-ii", "artemis-iii"],
    tags: ["sls", "artemis-program", "heavy-lift", "orion"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/exploration/systems/sls/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "starship-hls",
    slug: "starship-hls",
    name: "Starship Human Landing System (HLS)",
    type: "lander",
    status: "in-development",
    description:
      "SpaceX's Starship HLS is a variant of the Starship vehicle adapted to serve as the crewed lunar lander for Artemis III and subsequent missions. It requires on-orbit propellant transfer from tanker Starship vehicles before departing for the Moon. The system will deliver astronauts from lunar orbit to the surface and return them after surface operations.",
    entityIds: ["spacex", "nasa"],
    missionIds: ["artemis-iii"],
    tags: ["starship", "hls", "artemis-program", "crewed-lander"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/starship-hls/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "lunar-gateway",
    slug: "lunar-gateway",
    name: "Lunar Gateway",
    type: "gateway-module",
    status: "in-development",
    description:
      "The Lunar Gateway is a planned small space station in lunar orbit that will serve as a staging point for crewed and robotic missions to the lunar surface. The core elements are the Power and Propulsion Element (PPE) built by Maxar and the Habitation and Logistics Outpost (HALO) built by Northrop Grumman. International partners ESA, JAXA, and CSA are contributing modules and systems.",
    entityIds: ["nasa", "esa", "jaxa"],
    missionIds: ["artemis-iii"],
    tags: ["gateway", "ppe", "halo", "space-station", "cislunar"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/gateway/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "blue-moon-lander",
    slug: "blue-moon-lander",
    name: "Blue Moon Lander",
    type: "lander",
    status: "in-development",
    description:
      "Blue Origin's Blue Moon is a large crewed lunar lander being developed under NASA's Sustaining Lunar Development contract as an alternative to SpaceX's Starship HLS. The lander uses liquid hydrogen and liquid oxygen propulsion and is designed to deliver both crew and cargo to the lunar surface for Artemis missions beyond Artemis III.",
    entityIds: ["blue-origin", "nasa"],
    missionIds: [],
    tags: ["blue-moon", "hls", "crewed-lander", "sustaining-lunar-development"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/blue-moon/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "nova-c",
    slug: "nova-c",
    name: "Nova-C Lander",
    type: "lander",
    status: "operational",
    description:
      "Nova-C is Intuitive Machines' commercial lunar lander designed for NASA's CLPS program. Standing approximately 4 metres tall, the hexagonal lander uses liquid methane and liquid oxygen propulsion and can deliver roughly 130 kg of payload to the lunar surface. The IM-1 Odysseus mission demonstrated the platform in February 2024.",
    entityIds: ["intuitive-machines"],
    missionIds: ["im-1", "im-2"],
    tags: ["nova-c", "clps", "commercial-lander", "methalox"],
    sources: [
      {
        sourceId: "intuitive-machines-press",
        url: "https://www.intuitivemachines.com/lunarlander",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "hakuto-r-lander",
    slug: "hakuto-r-lander",
    name: "HAKUTO-R Lander",
    type: "lander",
    status: "in-development",
    description:
      "The HAKUTO-R is ispace's commercial lunar lander platform. Mission 1 crashed during its final descent in April 2023 due to a software error in altitude estimation. The updated Mission 2 lander incorporates design and software fixes and aims to achieve a successful soft landing and micro-rover deployment.",
    entityIds: ["ispace"],
    missionIds: ["hakuto-r-m2"],
    tags: ["hakuto-r", "commercial-lander", "japan"],
    sources: [
      {
        sourceId: "ispace-updates",
        url: "https://ispace-inc.com/hakuto-r/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "peregrine-lander",
    slug: "peregrine-lander",
    name: "Peregrine Lander",
    type: "lander",
    status: "in-development",
    description:
      "Astrobotic's Peregrine is a small commercial lunar lander developed under NASA's CLPS program. The first mission experienced a propulsion failure in January 2024. Astrobotic is applying lessons learned to improve the design for future missions while also developing the larger Griffin lander.",
    entityIds: ["astrobotic"],
    missionIds: ["peregrine-mission-one"],
    tags: ["peregrine", "clps", "commercial-lander"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/astrobotic-peregrine/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "lunar-relay-network",
    slug: "lunar-relay-network",
    name: "Lunar Relay Communications Network",
    type: "relay-satellite",
    status: "concept",
    description:
      "A proposed constellation of relay satellites in lunar orbit to provide continuous communication coverage for missions on the lunar surface, including the far side and polar regions. Multiple agencies and commercial providers are exploring architectures, with Intuitive Machines and ESA among those developing relay concepts.",
    entityIds: ["nasa", "intuitive-machines", "esa"],
    missionIds: [],
    tags: ["relay", "communications", "constellation", "infrastructure"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/lunar-communications-relay/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "viper-rover",
    slug: "viper-rover",
    name: "VIPER Rover",
    type: "rover",
    status: "decommissioned",
    description:
      "The Volatiles Investigating Polar Exploration Rover was a NASA golf-cart-sized rover designed to prospect for water ice at the lunar south pole. After significant cost increases and schedule delays, NASA cancelled the mission in July 2024. The completed rover hardware was offered to industry but no viable transfer arrangement was found.",
    entityIds: ["nasa"],
    missionIds: ["viper"],
    regionId: "shackleton-crater",
    tags: ["viper", "rover", "cancelled", "south-pole", "water-ice"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/viper/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
];
