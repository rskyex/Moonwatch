// ---------------------------------------------------------------------------
// Moonwatch – mock lunar region data
// ---------------------------------------------------------------------------

import type { LunarRegion } from "@/types";

const TS = "2026-01-15T00:00:00Z";

export const regions: LunarRegion[] = [
  {
    id: "south-pole-aitken",
    slug: "south-pole-aitken",
    name: "South Pole–Aitken Basin",
    coordinates: { lat: -53, lng: 169 },
    description:
      "The South Pole–Aitken Basin is the largest and oldest recognized impact structure on the Moon, stretching roughly 2,500 km in diameter and up to 8 km deep. It is a prime target for sample return missions because its floor may expose material from the lunar mantle.",
    significance:
      "Largest confirmed impact basin in the solar system; potential access to deep crustal and mantle material; target of Chang'e 6 far-side sample return.",
    missionIds: ["change-6"],
    tags: ["far-side", "impact-basin", "sample-return", "mantle-exposure"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/science/spa-basin/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "mare-tranquillitatis",
    slug: "mare-tranquillitatis",
    name: "Mare Tranquillitatis (Sea of Tranquility)",
    coordinates: { lat: 8.5, lng: 31.4 },
    description:
      "Mare Tranquillitatis is a lunar mare that sits within the Tranquillitatis basin on the near side of the Moon. It is best known as the site of the Apollo 11 landing in July 1969, the first crewed Moon landing in history.",
    significance:
      "Historic Apollo 11 landing site; well-characterized basaltic terrain; benchmark for lunar surface studies.",
    missionIds: [],
    tags: ["apollo-11", "historic", "nearside", "basalt"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_11/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "oceanus-procellarum",
    slug: "oceanus-procellarum",
    name: "Oceanus Procellarum",
    coordinates: { lat: 18.4, lng: -57.4 },
    description:
      "Oceanus Procellarum is the largest of the lunar maria, spanning over 2,500 km across the western near side. It is rich in KREEP (potassium, rare-earth elements, and phosphorus) materials and was explored by several Apollo and Luna missions.",
    significance:
      "Largest lunar mare; KREEP-rich terrain of high scientific interest; target area for future resource prospecting.",
    missionIds: [],
    tags: ["nearside", "kreep", "mare", "resource-prospecting"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/publications/books/lunar_sourcebook/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "shackleton-crater",
    slug: "shackleton-crater",
    name: "Shackleton Crater",
    coordinates: { lat: -89.9, lng: 0 },
    description:
      "Shackleton Crater sits almost exactly at the lunar south pole. Its permanently shadowed interior is believed to harbour significant deposits of water ice, while its rim enjoys near-continuous sunlight, making it an ideal site for solar-powered surface operations.",
    significance:
      "Prime candidate for crewed landing and base location; permanently shadowed regions with confirmed water ice signatures; near-constant solar illumination on rim.",
    missionIds: ["artemis-iii", "im-2"],
    tags: ["south-pole", "water-ice", "psr", "artemis-landing-candidate"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/artemis-iii",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "malapert-mountain",
    slug: "malapert-mountain",
    name: "Malapert Mountain",
    coordinates: { lat: -86.0, lng: 0.0 },
    description:
      "Malapert Mountain is a massif near the lunar south pole with a summit that has nearly continuous line-of-sight to Earth, making it a strategic location for communication relays. Its elevated position also provides favourable solar illumination conditions.",
    significance:
      "Candidate relay station site with Earth line-of-sight; strategic for south pole communications infrastructure; well-illuminated summit.",
    missionIds: [],
    tags: ["south-pole", "relay", "communications", "infrastructure-site"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/meetings/lpsc2023/pdf/1567.pdf",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "aristarchus-plateau",
    slug: "aristarchus-plateau",
    name: "Aristarchus Plateau",
    coordinates: { lat: 26.0, lng: -51.0 },
    description:
      "The Aristarchus Plateau is a raised volcanic formation on the near side hosting the brightest large crater on the Moon. It features Schr\u00F6ter's Valley, the largest sinuous rille on the Moon, and is of great interest for understanding lunar volcanism.",
    significance:
      "Highest albedo region on the Moon; extensive volcanic features including sinuous rilles; priority target for geological exploration.",
    missionIds: [],
    tags: ["volcanism", "nearside", "rille", "geology"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/publications/books/lunar_sourcebook/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "mare-imbrium",
    slug: "mare-imbrium",
    name: "Mare Imbrium",
    coordinates: { lat: 36.0, lng: -16.0 },
    description:
      "Mare Imbrium is one of the largest basalt-filled impact basins on the Moon, approximately 1,145 km in diameter. It was formed by a giant impact roughly 3.9 billion years ago and has been explored by the Apollo 15 and Chang'e 3 missions.",
    significance:
      "One of the largest and most prominent lunar maria; site of Apollo 15 and Chang'e 3 landings; well-characterised basaltic terrain.",
    missionIds: [],
    tags: ["nearside", "impact-basin", "basalt", "apollo-15"],
    sources: [
      {
        sourceId: "lpi-publications",
        url: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_15/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
];
