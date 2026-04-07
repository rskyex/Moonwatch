// ---------------------------------------------------------------------------
// Moonwatch – mock entity data
// ---------------------------------------------------------------------------

import type { Entity } from "@/types/entity";

const TS = "2026-01-15T00:00:00Z";

export const entities: Entity[] = [
  {
    id: "nasa",
    slug: "nasa",
    name: "National Aeronautics and Space Administration",
    type: "government-agency",
    shortName: "NASA",
    country: "US",
    description:
      "NASA leads the Artemis program, America's effort to return humans to the Moon and establish a sustainable presence. The agency coordinates with commercial and international partners to build the Lunar Gateway and develop surface systems. NASA also manages the CLPS program that contracts commercial lunar landers for robotic payload delivery.",
    website: "https://www.nasa.gov",
    missionIds: ["artemis-ii", "artemis-iii", "viper"],
    tags: ["artemis-program", "clps", "gateway", "government"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/artemis/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "esa",
    slug: "esa",
    name: "European Space Agency",
    type: "government-agency",
    shortName: "ESA",
    country: "Europe",
    description:
      "ESA contributes the European Service Module for the Orion spacecraft and is a major partner in the Lunar Gateway program. The agency is developing the PROSPECT drill and analysis package for lunar south pole resource prospecting. ESA also collaborates with Roscosmos on the Luna 27 mission.",
    website: "https://www.esa.int",
    missionIds: ["artemis-ii", "artemis-iii", "luna-27"],
    tags: ["gateway", "prospect", "orion-esm", "government"],
    sources: [
      {
        sourceId: "esa-newsroom",
        url: "https://www.esa.int/About_Us/ESA_Partnerships",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "jaxa",
    slug: "jaxa",
    name: "Japan Aerospace Exploration Agency",
    type: "government-agency",
    shortName: "JAXA",
    country: "Japan",
    description:
      "JAXA successfully demonstrated precision lunar landing with the SLIM mission in January 2024. The agency is a partner on the Lunar Gateway, contributing habitation technology and the I-HAB module. JAXA collaborates closely with NASA on Artemis and has committed to providing an astronaut for a future Gateway crew rotation.",
    website: "https://global.jaxa.jp",
    missionIds: ["slim"],
    tags: ["slim", "gateway", "i-hab", "government"],
    sources: [
      {
        sourceId: "jaxa-news",
        url: "https://global.jaxa.jp/projects/slim/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "isro",
    slug: "isro",
    name: "Indian Space Research Organisation",
    type: "government-agency",
    shortName: "ISRO",
    country: "India",
    description:
      "ISRO made history with Chandrayaan-3's successful south pole landing in August 2023, making India the fourth nation to soft-land on the Moon. The agency is developing Chandrayaan-4 as a sample return mission and exploring collaboration with NASA under the Artemis Accords. ISRO's lunar program focuses on resource mapping and technology demonstration.",
    website: "https://www.isro.gov.in",
    missionIds: ["chandrayaan-3", "chandrayaan-4"],
    tags: ["chandrayaan", "south-pole", "government"],
    sources: [
      {
        sourceId: "isro-updates",
        url: "https://www.isro.gov.in/Chandrayaan3.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "cnsa",
    slug: "cnsa",
    name: "China National Space Administration",
    type: "government-agency",
    shortName: "CNSA",
    country: "China",
    description:
      "CNSA operates one of the most active lunar programs in the world, having completed the Chang'e 6 far-side sample return in 2024. The agency is developing Chang'e 7 for south pole exploration and leads the International Lunar Research Station initiative with Russia and other partners. CNSA plans a crewed lunar landing before 2030.",
    website: "http://www.cnsa.gov.cn",
    missionIds: ["change-6", "change-7"],
    tags: ["chang-e", "ilrs", "sample-return", "government"],
    sources: [
      {
        sourceId: "cnsa-press-office",
        url: "http://www.cnsa.gov.cn/english/n6465652/n6465653/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "roscosmos",
    slug: "roscosmos",
    name: "Roscosmos State Corporation for Space Activities",
    type: "government-agency",
    shortName: "Roscosmos",
    country: "Russia",
    description:
      "Roscosmos has a long heritage of lunar exploration dating back to the Soviet Luna program. The agency is partnering with CNSA on the International Lunar Research Station and is developing the Luna 27 lander with ESA-provided instruments. Russia's recent Luna 25 failure in 2023 led to a restructuring of its lunar program timeline.",
    website: "https://www.roscosmos.ru",
    missionIds: ["luna-27"],
    tags: ["luna-program", "ilrs", "government"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/roscosmos/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "spacex",
    slug: "spacex",
    name: "Space Exploration Technologies Corp.",
    type: "private-company",
    shortName: "SpaceX",
    country: "US",
    description:
      "SpaceX is developing the Starship Human Landing System under a NASA contract to deliver Artemis astronauts to the lunar surface. The company's Starship architecture requires orbital refueling, a capability being actively tested. SpaceX also provides Falcon Heavy launch services for Gateway modules and other lunar payloads.",
    website: "https://www.spacex.com",
    missionIds: ["artemis-iii"],
    tags: ["starship", "hls", "falcon-heavy", "commercial"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/spacex/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "intuitive-machines",
    slug: "intuitive-machines",
    name: "Intuitive Machines",
    type: "private-company",
    shortName: "IM",
    country: "US",
    description:
      "Intuitive Machines made history with the IM-1 Odysseus landing in February 2024, the first commercial lunar lander to reach the surface. The company operates the Nova-C lander platform under NASA's CLPS program and is developing follow-on missions including IM-2 targeting the lunar south pole. IM is also building a lunar relay communications network.",
    website: "https://www.intuitivemachines.com",
    missionIds: ["im-1", "im-2"],
    tags: ["clps", "nova-c", "commercial-lunar"],
    sources: [
      {
        sourceId: "intuitive-machines-press",
        url: "https://www.intuitivemachines.com/about",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "ispace",
    slug: "ispace",
    name: "ispace, inc.",
    type: "private-company",
    shortName: "ispace",
    country: "Japan",
    description:
      "ispace is a Japanese lunar exploration company developing the HAKUTO-R lander series. The company's Mission 1 ended in a crash landing in April 2023, and Mission 2 is targeting a successful soft landing. ispace aims to build a cislunar transportation platform and has offices in Tokyo, Luxembourg, and the United States.",
    website: "https://ispace-inc.com",
    missionIds: ["hakuto-r-m2"],
    tags: ["hakuto-r", "commercial-lunar", "japan"],
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
    id: "astrobotic",
    slug: "astrobotic",
    name: "Astrobotic Technology",
    type: "private-company",
    shortName: "Astrobotic",
    country: "US",
    description:
      "Astrobotic is a Pittsburgh-based company developing lunar landers under NASA's CLPS program. The Peregrine Mission One experienced a propulsion anomaly in January 2024 and could not land. The company is developing the larger Griffin lander to deliver NASA's VIPER rover and continues to build its lunar delivery service business.",
    website: "https://www.astrobotic.com",
    missionIds: ["peregrine-mission-one"],
    tags: ["clps", "peregrine", "griffin", "commercial-lunar"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/astrobotic/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "blue-origin",
    slug: "blue-origin",
    name: "Blue Origin",
    type: "private-company",
    shortName: "Blue Origin",
    country: "US",
    description:
      "Blue Origin is developing the Blue Moon lander under NASA's Sustaining Lunar Development program as an alternative crewed landing system. The company's New Glenn rocket will support cislunar logistics. Blue Origin leads the National Team that includes Lockheed Martin, Draper, and Boeing for integrated lunar surface operations.",
    website: "https://www.blueorigin.com",
    missionIds: [],
    tags: ["blue-moon", "new-glenn", "hls", "commercial"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/blue-origin/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "firefly",
    slug: "firefly",
    name: "Firefly Aerospace",
    type: "private-company",
    shortName: "Firefly",
    country: "US",
    description:
      "Firefly Aerospace is developing the Blue Ghost lunar lander for NASA's CLPS program. The Blue Ghost Mission 1 will carry ten NASA payloads to Mare Crisium on the lunar nearside. Firefly also offers the Alpha and MLV launch vehicles and is expanding into cislunar transportation services.",
    website: "https://fireflyspace.com",
    missionIds: ["blue-ghost-m1"],
    tags: ["clps", "blue-ghost", "commercial-lunar"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/firefly-aerospace/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "ilrs-program",
    slug: "ilrs-program",
    name: "International Lunar Research Station Program",
    type: "international-program",
    shortName: "ILRS",
    country: undefined,
    description:
      "The International Lunar Research Station is a joint initiative led by China and Russia to build a permanent research facility on the lunar south pole. The program has attracted interest from several nations including Pakistan, South Africa, and Egypt. ILRS Phase 1 aims to establish basic infrastructure by 2028-2030 using a series of robotic precursor missions.",
    website: undefined,
    missionIds: ["change-7"],
    tags: ["ilrs", "international-cooperation", "lunar-base"],
    sources: [
      {
        sourceId: "cnsa-press-office",
        url: "http://www.cnsa.gov.cn/english/n6465652/n6465653/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    createdAt: TS,
    updatedAt: TS,
  },
];
