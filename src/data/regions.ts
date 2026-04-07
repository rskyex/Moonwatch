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
    scientificInterest:
      "Largest and deepest confirmed impact basin in the solar system. Exposes lower crustal and possibly upper mantle material, providing a window into the Moon's differentiation history.",
    strategicInterest:
      "Sample return from this basin could fundamentally revise lunar origin models. Multiple nations target this region for its scientific priority and relatively unexplored far-side access.",
    resources: ["mantle-material", "thorium", "iron"],
    terrain:
      "Vast elliptical basin, ~2,500 km diameter, 6-8 km deep. Far-side location. Rough interior with secondary craters and volcanic deposits.",
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
    scientificInterest:
      "Apollo 11 samples from this mare established the age of lunar basaltic volcanism at ~3.7 billion years. The thin regolith and well-dated basalt flows serve as a calibration point for crater-counting chronology across the inner solar system.",
    strategicInterest:
      "Heritage protection value as the first human landing site on another world. Near-side equatorial location offers straightforward Earth communications and low-inclination orbital access, but limited in-situ resource advantages compared to polar sites.",
    resources: ["basalt", "ilmenite", "regolith"],
    terrain:
      "Flat basaltic plain with gentle ridges and scattered small craters. Thin regolith (~5 m). Near-side equatorial location at ~0.67° N, 23.47° E (Apollo 11 site).",
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
    scientificInterest:
      "Highest concentrations of KREEP material on the Moon, representing the last residual liquid from the lunar magma ocean. Understanding KREEP distribution constrains models of lunar thermal evolution and asymmetric crustal formation.",
    strategicInterest:
      "KREEP deposits contain elevated concentrations of rare-earth elements, thorium, and phosphorus with long-term resource extraction potential. The vast, relatively flat terrain is suitable for large-scale infrastructure such as landing pads and solar arrays.",
    resources: ["kreep", "rare-earth-elements", "thorium", "phosphorus", "regolith"],
    terrain:
      "Expansive basaltic plain, >2,500 km across. Younger lava flows (~1.2 Ga in places) with wrinkle ridges, volcanic domes, and graben. Western near-side location.",
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
    scientificInterest:
      "Permanently shadowed interior may preserve volatiles deposited over billions of years, offering a pristine record of the inner solar system's volatile budget. Rim receives near-constant illumination, enabling long-duration solar-powered science stations.",
    strategicInterest:
      "The combination of permanent shadow (cold traps for water ice) and near-permanent sunlight on the rim makes Shackleton one of the most strategically valuable sites on the Moon. It is the leading candidate for initial lunar base infrastructure.",
    resources: ["water-ice", "solar-energy", "regolith"],
    terrain:
      "Impact crater, 21 km diameter, 4.2 km deep. Interior permanently shadowed. Rim peaks receive ~80-90% solar illumination annually.",
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
    scientificInterest:
      "The massif's exposed stratigraphy records ancient highland crustal material predating the south pole impact events. Studying its composition helps constrain the sequence of basin-forming impacts that shaped the south polar region.",
    strategicInterest:
      "Summit maintains near-continuous Earth line-of-sight, making it the preferred location for a south pole communications relay. Favourable solar illumination (~89% annually) supports permanent power generation without nuclear sources.",
    resources: ["solar-energy", "highland-regolith", "anorthosite"],
    terrain:
      "Highland massif rising ~5 km above surrounding terrain. Summit plateau approximately 5 km across. Located ~120 km from the south pole. Moderate slopes with boulder fields on flanks.",
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
      "The Aristarchus Plateau is a raised volcanic formation on the near side hosting the brightest large crater on the Moon. It features Schröter's Valley, the largest sinuous rille on the Moon, and is of great interest for understanding lunar volcanism.",
    significance:
      "Highest albedo region on the Moon; extensive volcanic features including sinuous rilles; priority target for geological exploration.",
    scientificInterest:
      "Contains the most geologically diverse volcanic complex on the Moon. Schröter's Valley (160 km long, up to 11 km wide) records large-volume effusive eruption channels. Transient lunar phenomena—repeated brightenings observed telescopically—remain unexplained and may indicate residual outgassing.",
    strategicInterest:
      "Pyroclastic glass deposits blanketing the plateau are rich in volatile-bearing beads, making this one of the best near-side candidates for oxygen and metal extraction from volcanic glass. Equatorial near-side position simplifies mission logistics.",
    resources: ["pyroclastic-glass", "iron", "oxygen", "titanium", "volcanic-volatiles"],
    terrain:
      "Elevated plateau (~2 km above Oceanus Procellarum), ~170 × 200 km. Features Aristarchus crater (40 km, bright rays), Schröter's Valley sinuous rille, and dark pyroclastic mantling deposits.",
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
    scientificInterest:
      "The Imbrium impact is a cornerstone event in lunar stratigraphy; most of the Moon's relative geologic timescale is referenced to it. Apollo 15 samples from the Hadley-Apennine region constrained the basin age to ~3.85 Ga and revealed green volcanic glass indicative of deep mantle melting.",
    strategicInterest:
      "Extensive, well-mapped basaltic plains with low slopes provide safe landing and rover traverse terrain. High ilmenite content in some basalt units makes the region a candidate for oxygen extraction via ilmenite reduction. Near-side location ensures continuous Earth communication.",
    resources: ["basalt", "ilmenite", "oxygen", "regolith"],
    terrain:
      "Circular impact basin ~1,145 km diameter, filled with multiple generations of basalt flows. Bordered by the Apennine and Carpathian mountain ranges (up to 5 km relief). Interior is relatively flat with wrinkle ridges and scattered secondary craters.",
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
