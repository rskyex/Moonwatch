// ---------------------------------------------------------------------------
// Moonwatch – mock milestone data
// ---------------------------------------------------------------------------

import type { Milestone } from "@/types";

const TS = "2026-01-15T00:00:00Z";

export const milestones: Milestone[] = [
  {
    id: "chandrayaan-3-landing",
    slug: "chandrayaan-3-landing",
    name: "Chandrayaan-3 Landing",
    title: "Chandrayaan-3 successfully lands near the lunar south pole",
    date: "2023-08-23T00:00:00Z",
    dateGranularity: "exact",
    type: "landing",
    status: "achieved",
    missionIds: ["chandrayaan-3"],
    entityIds: ["isro"],
    description:
      "India's Chandrayaan-3 Vikram lander touched down at 69.37\u00B0S, making India the fourth nation to soft-land on the Moon and the first to land near the south pole.",
    tags: ["chandrayaan", "south-pole", "india", "soft-landing"],
    sources: [
      {
        sourceId: "isro-updates",
        url: "https://www.isro.gov.in/Chandrayaan3_landing.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Chandrayaan-3 proved that a mid-budget space agency can achieve a soft landing on the first south-pole attempt, dramatically expanding the pool of nations capable of independent lunar access. The landing site data from Vikram and Pragyan provided the first in-situ measurements of south-polar regolith composition, informing site selection for future ISRU and habitation missions.",
    horizon: "recent",
    thematicGroup: "international-cooperation",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "slim-landing",
    slug: "slim-landing",
    name: "SLIM Lunar Landing",
    title: "JAXA's SLIM achieves precision landing within 55 metres of target",
    date: "2024-01-19T00:00:00Z",
    dateGranularity: "exact",
    type: "landing",
    status: "achieved",
    missionIds: ["slim"],
    entityIds: ["jaxa"],
    description:
      "JAXA's SLIM lander touched down in the Shioli crater, demonstrating pinpoint landing accuracy within 55 metres. Japan became the fifth nation to land on the Moon, though the lander came to rest inverted.",
    tags: ["slim", "japan", "precision-landing"],
    sources: [
      {
        sourceId: "jaxa-news",
        url: "https://global.jaxa.jp/press/2024/01/20240120-1_e.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "SLIM demonstrated that precision landing within 100 metres is achievable with lightweight, low-cost technology — a capability essential for targeting scientifically valuable terrain and landing near pre-positioned assets. Japan's entry as the fifth lunar-landing nation broadens the coalition of countries with independent surface access, strengthening the foundation for multilateral exploration.",
    horizon: "recent",
    thematicGroup: "international-cooperation",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "change-6-sample-return",
    slug: "change-6-sample-return",
    name: "Chang'e 6 Sample Return",
    title: "Chang'e 6 returns first-ever samples from the lunar far side",
    date: "2024-06-25T00:00:00Z",
    dateGranularity: "exact",
    type: "sample-return",
    status: "achieved",
    missionIds: ["change-6"],
    entityIds: ["cnsa"],
    description:
      "The Chang'e 6 return capsule landed in Inner Mongolia carrying approximately 1,935 grams of regolith from the Apollo crater on the far side, a historic first for planetary science.",
    tags: ["chang-e", "sample-return", "far-side", "first-ever"],
    sources: [
      {
        sourceId: "cnsa-press-office",
        url: "http://www.cnsa.gov.cn/english/n6465652/n6465653/ce6_return.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Far-side samples provide the first ground-truth data on a geological province shielded from Earth-facing impacts and volcanism, reshaping models of the Moon's asymmetric evolution. The mission also validated China's relay-satellite communications architecture (Queqiao-2), proving the operational concept for sustained far-side activity. It cements the Chang'e program as the most productive robotic lunar campaign since Luna/Surveyor.",
    horizon: "recent",
    thematicGroup: "chang-e-program",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "im-1-landing",
    slug: "im-1-landing",
    name: "IM-1 Odysseus Landing",
    title: "Intuitive Machines Odysseus becomes first commercial lander on the Moon",
    date: "2024-02-22T00:00:00Z",
    dateGranularity: "exact",
    type: "landing",
    status: "achieved",
    missionIds: ["im-1"],
    entityIds: ["intuitive-machines", "nasa"],
    description:
      "The Nova-C Odysseus lander soft-landed near Malapert A crater, becoming the first commercial spacecraft to land on the Moon. It tipped on its side but still transmitted data from its NASA payloads.",
    tags: ["clps", "commercial-lunar", "first-commercial-landing"],
    sources: [
      {
        sourceId: "intuitive-machines-press",
        url: "https://www.intuitivemachines.com/im-1-landing",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "IM-1 proved that the CLPS commercial-services model can deliver payloads to the lunar surface, validating NASA's strategy of buying rides rather than building bespoke landers for every science package. Even with a tip-over, the mission returned usable data from five NASA instruments — demonstrating that partial success in commercial lunar delivery still yields science value. It opened the door for a cadence of low-cost robotic precursor missions.",
    horizon: "recent",
    thematicGroup: "commercial-lunar",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "peregrine-failure",
    slug: "peregrine-failure",
    name: "Peregrine Mission One Failure",
    title: "Astrobotic's Peregrine lander lost due to propulsion anomaly after launch",
    date: "2024-01-08T00:00:00Z",
    dateGranularity: "exact",
    type: "launch",
    status: "achieved",
    missionIds: ["peregrine-mission-one"],
    entityIds: ["astrobotic", "nasa"],
    description:
      "The Peregrine lander experienced a critical propellant leak shortly after separating from the Vulcan Centaur upper stage, preventing any attempt at a lunar landing. The spacecraft was directed to re-enter Earth's atmosphere on 18 January.",
    tags: ["peregrine", "failure", "clps", "propulsion-anomaly"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/astrobotic-peregrine-failure/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "The Peregrine failure stress-tested the CLPS multi-vendor model: because NASA had parallel contracts with Intuitive Machines and others, no single loss halted the program's momentum. The anomaly investigation yielded propulsion-system lessons now incorporated into Astrobotic's larger Griffin lander and future missions. It also reinforced that commercial lunar delivery inherently carries higher per-mission risk, which the portfolio approach is designed to absorb.",
    horizon: "recent",
    thematicGroup: "commercial-lunar",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "artemis-ii-flyby",
    slug: "artemis-ii-flyby",
    name: "Artemis II Crewed Flyby",
    title: "Artemis II completes first crewed lunar flyby since Apollo 17",
    date: "2025-09-01T00:00:00Z",
    dateGranularity: "quarter",
    type: "flyby",
    status: "achieved",
    missionIds: ["artemis-ii"],
    entityIds: ["nasa", "esa"],
    description:
      "Four astronauts aboard Orion completed a free-return trajectory around the Moon, marking humanity's first crewed voyage beyond low Earth orbit since December 1972.",
    tags: ["artemis-program", "crewed", "flyby", "orion"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/mission/artemis-ii/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Artemis II closed a 53-year gap in crewed deep-space flight, validating Orion's life-support systems, heat shield, and abort capabilities with humans on board for the first time. The mission proved the SLS-Orion stack is crew-ready, clearing the critical path for a crewed landing on Artemis III. It also demonstrated ESA's European Service Module in a crewed configuration, cementing Europe's role in the Artemis architecture.",
    horizon: "recent",
    thematicGroup: "artemis-program",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "im-2-south-pole-landing",
    slug: "im-2-south-pole-landing",
    name: "IM-2 South Pole Landing",
    title: "Intuitive Machines IM-2 targets first commercial south pole landing",
    date: "2025-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "landing",
    status: "upcoming",
    missionIds: ["im-2"],
    entityIds: ["intuitive-machines", "nasa"],
    description:
      "The IM-2 Nova-C lander will attempt to land near Shackleton Crater at the lunar south pole, carrying NASA's PRIME-1 drill to search for sub-surface water ice.",
    tags: ["clps", "south-pole", "prime-1", "water-ice"],
    sources: [
      {
        sourceId: "intuitive-machines-press",
        url: "https://www.intuitivemachines.com/im-2",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "IM-2 carries PRIME-1, the first drill designed to sample sub-surface lunar ice in situ — data that every ISRU business case is waiting for. A successful south-pole landing would also validate commercial delivery to the most operationally demanding region on the Moon, where lighting and thermal conditions are extreme. This is the pathfinder mission for the resource-prospecting campaign that precedes human settlement.",
    horizon: "upcoming",
    thematicGroup: "commercial-lunar",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "artemis-iii-crewed-landing",
    slug: "artemis-iii-crewed-landing",
    name: "Artemis III Crewed Landing",
    title: "Artemis III aims to land first woman and next man on the Moon",
    date: "2026-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "landing",
    status: "upcoming",
    missionIds: ["artemis-iii"],
    entityIds: ["nasa", "spacex"],
    description:
      "Artemis III will use SpaceX's Starship HLS to land two astronauts on the lunar south pole near Shackleton Crater for a multi-day surface stay including EVAs and sample collection.",
    tags: ["artemis-program", "crewed", "south-pole", "starship-hls"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/mission/artemis-iii/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Artemis III would be the first crewed lunar landing since Apollo 17 in 1972 and the first ever at the south pole, where permanently shadowed craters may hold water ice critical for sustained presence. It is the proof-of-concept mission for the entire Artemis surface architecture, including Starship HLS and the new xEMU spacesuits. Success or failure here will shape the political and budgetary trajectory of human lunar exploration for a decade.",
    horizon: "upcoming",
    thematicGroup: "artemis-program",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "change-7-south-pole-survey",
    slug: "change-7-south-pole-survey",
    name: "Chang'e 7 South Pole Survey",
    title: "Chang'e 7 to survey lunar south pole for water ice and ILRS site selection",
    date: "2026-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "landing",
    status: "upcoming",
    missionIds: ["change-7"],
    entityIds: ["cnsa", "ilrs-program"],
    description:
      "Chang'e 7 will deploy an orbiter, lander, rover, and mini-flying probe to the south pole to map resources and select sites for the International Lunar Research Station.",
    tags: ["chang-e", "south-pole", "ilrs", "survey", "water-ice"],
    sources: [
      {
        sourceId: "cnsa-press-office",
        url: "http://www.cnsa.gov.cn/english/n6465652/n6465653/ce7.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Chang'e 7 is the reconnaissance mission for the ILRS, China's answer to Artemis Base Camp. Its mini-flying probe will hop into permanently shadowed craters to directly detect water ice — something no mission has yet accomplished. The survey results will determine the ILRS site and, by extension, where a second major nation anchors its long-term lunar presence.",
    horizon: "upcoming",
    thematicGroup: "chang-e-program",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "gateway-ppe-halo-launch",
    slug: "gateway-ppe-halo-launch",
    name: "Gateway PPE/HALO Launch",
    title: "Lunar Gateway PPE and HALO modules target launch on Falcon Heavy",
    date: "2027-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "launch",
    status: "upcoming",
    missionIds: [],
    entityIds: ["nasa", "esa", "jaxa"],
    description:
      "The Power and Propulsion Element and Habitation and Logistics Outpost will launch together on a SpaceX Falcon Heavy to begin assembling the Lunar Gateway in near-rectilinear halo orbit around the Moon.",
    tags: ["gateway", "ppe", "halo", "falcon-heavy", "cislunar"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/gateway/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "PPE/HALO is the seed of the first crewed facility beyond low Earth orbit, establishing a permanent human-tended waypoint in cislunar space. Once operational, Gateway decouples crew delivery from surface access, enabling lander reuse and flexible mission cadence. The launch also represents the most significant international hardware integration since ISS assembly began.",
    horizon: "upcoming",
    thematicGroup: "infrastructure",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "chandrayaan-4-launch",
    slug: "chandrayaan-4-launch",
    name: "Chandrayaan-4 Launch",
    title: "India targets Chandrayaan-4 sample return mission launch",
    date: "2027-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "launch",
    status: "upcoming",
    missionIds: ["chandrayaan-4"],
    entityIds: ["isro"],
    description:
      "ISRO plans to launch Chandrayaan-4 using a two-launch architecture to demonstrate autonomous rendezvous in lunar orbit and return the first Indian lunar samples to Earth.",
    tags: ["chandrayaan", "sample-return", "india"],
    sources: [
      {
        sourceId: "isro-updates",
        url: "https://www.isro.gov.in/Chandrayaan4.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Chandrayaan-4 would make India only the fourth entity to return lunar samples, after the US, Soviet Union, and China. Its two-launch autonomous-rendezvous architecture tests techniques directly applicable to future Mars sample return and crewed missions. Success would validate India as a full-spectrum lunar power capable of end-to-end surface-to-Earth sample chains.",
    horizon: "upcoming",
    thematicGroup: "international-cooperation",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "ilrs-phase-1",
    slug: "ilrs-phase-1",
    name: "ILRS Phase 1",
    title: "International Lunar Research Station Phase 1 basic infrastructure deployment",
    date: "2028-01-01T00:00:00Z",
    dateGranularity: "tbd",
    type: "deployment",
    status: "upcoming",
    missionIds: ["change-7"],
    entityIds: ["cnsa", "roscosmos", "ilrs-program"],
    description:
      "ILRS Phase 1 targets the deployment of basic surface infrastructure at the lunar south pole between 2028 and 2030, including power systems, communications relays, and initial habitat elements via a series of robotic precursor missions.",
    tags: ["ilrs", "lunar-base", "south-pole", "infrastructure"],
    sources: [
      {
        sourceId: "cnsa-press-office",
        url: "http://www.cnsa.gov.cn/english/n6465652/n6465653/ilrs.html",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "ILRS Phase 1 represents the first attempt to deploy persistent, uncrewed surface infrastructure designed to support eventual human habitation — a fundamentally different approach from Artemis's crew-first sorties. If successful, it demonstrates that robotic pre-positioning can bootstrap a lunar base before astronauts arrive, potentially offering a lower-risk path to sustained presence. It also establishes a second, China-led institutional framework for international lunar cooperation.",
    horizon: "long-term",
    thematicGroup: "international-cooperation",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "blue-moon-landing-demo",
    slug: "blue-moon-landing-demo",
    name: "Blue Moon Landing Demo",
    title: "Blue Origin targets uncrewed Blue Moon lander demonstration",
    date: "2027-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "landing",
    status: "upcoming",
    missionIds: [],
    entityIds: ["blue-origin", "nasa"],
    description:
      "Blue Origin plans an uncrewed demonstration landing of the Blue Moon lander to validate its propulsion, guidance, and landing systems ahead of crewed Artemis missions.",
    tags: ["blue-moon", "hls", "demonstration", "uncrewed"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/tag/blue-moon/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "This demo is the gate-check for Blue Origin's entry as the second crewed lunar lander provider, giving NASA the competitive redundancy it needs to sustain mission cadence if either HLS provider encounters delays. The hydrogen-oxygen propulsion system tested here is also the most ISRU-compatible architecture in development, since lunar water ice can be split into the same propellants. A successful demo would confirm that two independent crewed-landing pathways exist for the Artemis program.",
    horizon: "upcoming",
    thematicGroup: "artemis-program",
    createdAt: TS,
    updatedAt: TS,
  },

  // -----------------------------------------------------------------------
  // New long-term milestones
  // -----------------------------------------------------------------------
  {
    id: "artemis-first-surface-eva",
    slug: "artemis-first-surface-eva",
    name: "First Artemis Surface EVA",
    title: "First moonwalk since Apollo 17 conducted during Artemis surface mission",
    date: "2027-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "other",
    status: "upcoming",
    missionIds: ["artemis-iii"],
    entityIds: ["nasa", "spacex"],
    description:
      "The first extravehicular activity on the lunar surface since December 1972, using the Axiom Space xEMU-derived suits. Astronauts will collect samples, deploy instruments, and test mobility near the south pole during a multi-hour EVA.",
    tags: ["artemis-program", "eva", "moonwalk", "south-pole", "xemu"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/mission/artemis-iii/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "The first moonwalk in over half a century will demonstrate next-generation EVA suit technology, validate crew surface operations procedures at the south pole, and produce the first human-collected samples from a permanently shadowed region. It is the moment the Artemis program transitions from transportation demonstration to surface science, and its imagery will anchor public and political support for sustained investment.",
    horizon: "upcoming",
    thematicGroup: "artemis-program",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "gateway-initial-operations",
    slug: "gateway-initial-operations",
    name: "Gateway Initial Operations",
    title: "Lunar Gateway begins first crewed operational phase in cislunar orbit",
    date: "2028-01-01T00:00:00Z",
    dateGranularity: "year",
    type: "deployment",
    status: "upcoming",
    missionIds: [],
    entityIds: ["nasa", "esa", "jaxa", "csa"],
    description:
      "The Lunar Gateway reaches initial operational capability with PPE, HALO, and the first visiting crew, becoming the first permanently crewed cislunar station. The facility will support science investigations, technology demonstrations, and staging for surface missions.",
    tags: ["gateway", "cislunar", "space-station", "crewed", "international"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/gateway/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Gateway initial operations mark the first time humans have lived and worked in deep space on a sustained basis, proving life-support and radiation-protection systems far beyond the Van Allen belts. As a reusable staging platform, it enables lander pre-positioning and refueling that can double the achievable surface mission rate. The multinational crew rotations also establish the governance and operational precedents for shared deep-space infrastructure.",
    horizon: "long-term",
    thematicGroup: "infrastructure",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "first-isru-lunar-demo",
    slug: "first-isru-lunar-demo",
    name: "First ISRU Demonstration on the Moon",
    title: "First in-situ resource utilization demonstration extracts usable resources from lunar regolith",
    date: "2029-01-01T00:00:00Z",
    dateGranularity: "tbd",
    type: "deployment",
    status: "upcoming",
    missionIds: [],
    entityIds: ["nasa"],
    description:
      "The first end-to-end demonstration of extracting water ice from lunar regolith and converting it into usable oxygen and hydrogen on the lunar surface. This proves the technical feasibility of local propellant production and life-support consumable generation, a prerequisite for sustainable human presence.",
    tags: ["isru", "water-ice", "propellant", "oxygen", "south-pole", "sustainability"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/isru-demonstration/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Proving that lunar resources can supplement Earth-launched supplies is the single most consequential technical milestone for sustained human presence beyond Earth. If water ice can be extracted and processed at acceptable energy cost, it reduces the mass that must be launched from Earth for propellant and life support by potentially 80 percent. Every cislunar transportation architecture and lunar base business case assumes this works — the demo is the inflection point between exploration and settlement.",
    horizon: "long-term",
    thematicGroup: "infrastructure",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "first-commercial-cargo-to-gateway",
    slug: "first-commercial-cargo-to-gateway",
    name: "First Commercial Cargo Delivery to Gateway",
    title: "First commercial logistics resupply mission arrives at the Lunar Gateway",
    date: "2029-01-01T00:00:00Z",
    dateGranularity: "tbd",
    type: "docking",
    status: "upcoming",
    missionIds: [],
    entityIds: ["nasa", "spacex"],
    description:
      "The first commercial cargo spacecraft docks with the Lunar Gateway to deliver supplies, equipment, and experiments — extending the commercial resupply model proven on the ISS to cislunar space. SpaceX's Dragon XL is the lead candidate vehicle under NASA's Gateway Logistics Services contract.",
    tags: ["gateway", "commercial-cargo", "logistics", "dragon-xl", "cislunar"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/gateway/logistics/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Commercial cargo delivery to Gateway would replicate in deep space the ISS Commercial Resupply Services model that proved buying logistics as a service is cheaper and more sustainable than government-owned vehicles. It establishes a recurring revenue stream that incentivises private investment in cislunar transportation, gradually shifting the economic center of gravity from government-funded exploration to a mixed economy. It is also a prerequisite for Gateway to operate as a continuously crewed facility.",
    horizon: "long-term",
    thematicGroup: "commercial-lunar",
    createdAt: TS,
    updatedAt: TS,
  },
];
