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
    whyItMatters:
      "SLS is the only operational super-heavy-lift vehicle purpose-built for deep space crew transport, making it the backbone of the Artemis architecture. Without it, NASA has no independently certified pathway to send astronauts beyond low Earth orbit. Its continued flight cadence directly determines the pace of crewed lunar exploration.",
    category: "logistics",
    maturity: "flight-proven",
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
    whyItMatters:
      "Starship HLS introduces the first fully reusable crewed lunar lander, with cargo capacity an order of magnitude greater than Apollo's LM. Its reliance on orbital refueling is a technical first that, if proven, unlocks routine heavy-payload delivery to the lunar surface. Success here reshapes the economics of sustained lunar presence.",
    category: "landing-systems",
    maturity: "prototype",
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
    whyItMatters:
      "Gateway provides the first permanent human outpost in deep space, serving as a reusable staging platform that decouples crew transport from surface access. It enables mission flexibility by allowing landers to be pre-positioned and reused across missions. As a multinational facility, it also anchors international cooperation in cislunar space for decades to come.",
    category: "orbital",
    maturity: "prototype",
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
    whyItMatters:
      "Blue Moon provides competitive redundancy in the crewed lunar lander market, ensuring NASA is not dependent on a single provider for surface access. Its hydrogen-oxygen propulsion architecture is compatible with future ISRU-produced propellants, potentially enabling lunar-sourced refueling. A second proven lander also doubles the mission cadence the program can sustain.",
    category: "landing-systems",
    maturity: "prototype",
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
    whyItMatters:
      "Nova-C proved that a private company can deliver payloads to the lunar surface on a commercial contract, validating the CLPS model of buying lunar delivery as a service. Frequent, low-cost robotic deliveries are essential for pre-positioning instruments and supplies before crewed missions arrive. Each successful flight lowers the risk premium for commercial lunar logistics.",
    category: "landing-systems",
    maturity: "flight-proven",
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
    whyItMatters:
      "HAKUTO-R represents the first commercially funded Japanese lunar lander, expanding the geography of the commercial space economy beyond the US. Its lightweight rideshare-compatible design targets a price point accessible to universities and small agencies. A successful Mission 2 would validate the learn-from-failure iteration model that commercial lunar ventures depend on.",
    category: "landing-systems",
    maturity: "prototype",
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
    whyItMatters:
      "Peregrine's failure underscored the inherent risk in commercial lunar delivery but also the value of NASA's multi-vendor CLPS strategy — no single failure halts the program. Astrobotic's larger Griffin lander is designed to carry NASA's VIPER-class payloads, so lessons from Peregrine directly inform a heavier-class delivery capability. Resilience through iteration is central to making lunar logistics routine.",
    category: "landing-systems",
    maturity: "prototype",
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
    whyItMatters:
      "Continuous communication is a hard prerequisite for crewed surface operations and autonomous rover navigation — without it, far-side and polar missions face dangerous blackout periods. A relay network also enables high-bandwidth science data return, multiplying the value of every surface instrument. It is the single most enabling piece of shared infrastructure for the entire lunar ecosystem.",
    category: "communications",
    maturity: "conceptual",
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
    whyItMatters:
      "VIPER's cancellation left a critical gap in ground-truth knowledge about the distribution and accessibility of lunar water ice — data that every ISRU business case depends on. Its instruments and mission design remain the reference architecture for future prospecting rovers. The program's cost overrun also prompted NASA to rethink how it manages mid-scale robotic missions.",
    category: "mobility",
    maturity: "flight-proven",
    createdAt: TS,
    updatedAt: TS,
  },

  // -----------------------------------------------------------------------
  // New entries — expanding the infrastructure taxonomy
  // -----------------------------------------------------------------------
  {
    id: "lunar-comms-relay",
    slug: "lunar-comms-relay",
    name: "Lunar Communications Relay",
    type: "communications",
    status: "concept",
    description:
      "A dedicated relay satellite constellation for continuous Earth-Moon communication, designed to eliminate coverage gaps for far-side and polar surface operations. Architectures under study range from ESA's Moonlight programme to commercial offerings by Intuitive Machines and other providers. The system would support voice, telemetry, and high-rate science data for crewed and robotic missions alike.",
    entityIds: ["esa", "intuitive-machines", "nasa"],
    missionIds: [],
    tags: ["communications", "relay", "constellation", "moonlight", "far-side"],
    sources: [
      {
        sourceId: "spacenews",
        url: "https://spacenews.com/esa-moonlight-lunar-comms/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Without dedicated comms relay, every far-side and polar mission operates in periodic blackout — unacceptable for crew safety and a severe constraint on science return. A shared constellation amortises cost across all missions, lowering the barrier to entry for smaller agencies and commercial operators. This is foundational utility infrastructure, analogous to undersea cables on Earth.",
    category: "communications",
    maturity: "conceptual",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "lunar-nav-network",
    slug: "lunar-nav-network",
    name: "Lunar Surface Navigation Network",
    type: "navigation",
    status: "concept",
    description:
      "A proposed positioning system for lunar surface operations, providing GPS-like navigation signals to rovers, crew on EVA, and landers during terminal descent. Multiple architectures are under study, including beacon-based systems and cislunar satellite constellations. Precision surface navigation is a prerequisite for autonomous rover traverses and hazard-avoidance landing.",
    entityIds: ["nasa", "esa"],
    missionIds: [],
    tags: ["navigation", "positioning", "autonomous-operations", "precision-landing"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/lunar-nav-architecture/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Autonomous surface mobility — essential for ISRU hauling, site preparation, and crew safety — requires reliable absolute positioning that terrain-relative navigation alone cannot guarantee. A shared nav network turns the Moon from a place you land on into a place you can navigate across. It is also critical for precision landing, allowing multiple missions to land within metres of pre-positioned assets.",
    category: "navigation",
    maturity: "conceptual",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "isru-demo-unit",
    slug: "isru-demo-unit",
    name: "ISRU Demonstration Unit",
    type: "isru",
    status: "in-development",
    description:
      "An in-situ resource utilization prototype designed to extract water ice from lunar regolith and demonstrate conversion into usable oxygen and hydrogen. Several concepts are in parallel development, including NASA's OVEN/LITA experiments and commercial proposals. A successful demonstration would validate the technical and economic feasibility of local propellant production and life support consumables.",
    entityIds: ["nasa"],
    missionIds: [],
    regionId: "shackleton-crater",
    tags: ["isru", "water-ice", "propellant-production", "south-pole", "oxygen"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/isru-demonstration/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "ISRU is the single technology that transforms lunar exploration from a flags-and-footprints campaign into a self-sustaining presence. If water ice can be economically extracted and processed, it slashes the mass that must be launched from Earth for propellant and life support by orders of magnitude. Every long-term habitation and cislunar transportation plan assumes ISRU works — this demo is the proof point.",
    category: "isru",
    maturity: "prototype",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "orion-spacecraft",
    slug: "orion-spacecraft",
    name: "Orion Spacecraft",
    type: "other",
    status: "operational",
    description:
      "NASA's Orion Multi-Purpose Crew Vehicle is the deep-space capsule that transports astronauts from Earth to cislunar space and back. Built by Lockheed Martin with ESA providing the European Service Module, Orion launched uncrewed on Artemis I in 2022 and carried crew on Artemis II. It is the command module for all Artemis crewed missions and is rated for up to 21 days of independent flight.",
    entityIds: ["nasa", "esa"],
    missionIds: ["artemis-ii", "artemis-iii"],
    tags: ["orion", "crew-capsule", "artemis-program", "deep-space", "esm"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/exploration/systems/orion/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Orion is the only crew-rated deep-space vehicle currently operational in the Western world, making it the irreplaceable link between Earth and the lunar vicinity. Its heat shield, designed for 40,000 km/h re-entry, represents a capability not fielded since Apollo. Paired with Gateway, Orion's reusability across missions keeps per-flight crew transport costs on a downward trajectory.",
    category: "logistics",
    maturity: "flight-proven",
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: "lunar-surface-habitat",
    slug: "lunar-surface-habitat",
    name: "Lunar Surface Habitat (concept)",
    type: "habitat",
    status: "concept",
    description:
      "A pressurized living quarters concept for extended crew stays on the lunar surface, moving beyond EVA-only sortie missions to multi-week habitation. Design studies from NASA, ESA, and commercial partners explore rigid, inflatable, and hybrid shell architectures with integrated life support, radiation shielding, and dust mitigation. A surface habitat is a prerequisite for the transition from exploration to permanent presence.",
    entityIds: ["nasa", "esa"],
    missionIds: [],
    regionId: "shackleton-crater",
    tags: ["habitat", "surface-stay", "life-support", "radiation-shielding", "habitation"],
    sources: [
      {
        sourceId: "nasa-artemis-blog",
        url: "https://www.nasa.gov/lunar-surface-habitat/",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    whyItMatters:
      "Without a pressurized habitat, crew time on the surface is limited to what a lander cabin and EVA suits can support — typically days, not weeks. A dedicated habitat enables the science campaigns, ISRU operations, and construction activities that justify sustained investment in lunar infrastructure. It is the architectural tipping point between visiting the Moon and living there.",
    category: "habitation",
    maturity: "conceptual",
    createdAt: TS,
    updatedAt: TS,
  },
];
