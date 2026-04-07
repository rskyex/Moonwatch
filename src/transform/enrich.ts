import type { Update } from "@/types";
import { missions } from "@/data/missions";
import { entities } from "@/data/entities";
import { infrastructure } from "@/data/infrastructure";

/**
 * Keyword patterns for matching updates to known entities.
 * Maps search terms to entity/mission/infrastructure IDs.
 */
interface MatchPattern {
  keywords: string[];
  id: string;
}

function buildMissionPatterns(): MatchPattern[] {
  return missions.map(m => ({
    keywords: [
      m.name.toLowerCase(),
      m.slug,
      ...(m.tags || []),
    ].filter(Boolean),
    id: m.id,
  }));
}

function buildEntityPatterns(): MatchPattern[] {
  return entities.map(e => ({
    keywords: [
      e.name.toLowerCase(),
      e.slug,
      e.shortName?.toLowerCase(),
      ...(e.tags || []),
    ].filter((k): k is string => Boolean(k)),
    id: e.id,
  }));
}

function buildInfrastructurePatterns(): MatchPattern[] {
  return infrastructure.map(i => ({
    keywords: [
      i.name.toLowerCase(),
      i.slug,
      ...(i.tags || []),
    ].filter(Boolean),
    id: i.id,
  }));
}

/**
 * Find all matching pattern IDs in a text string.
 */
function findMatches(text: string, patterns: MatchPattern[]): string[] {
  const lower = text.toLowerCase();
  const matched = new Set<string>();

  for (const pattern of patterns) {
    for (const keyword of pattern.keywords) {
      if (keyword.length >= 3 && lower.includes(keyword)) {
        matched.add(pattern.id);
        break; // One match per pattern is enough
      }
    }
  }

  return Array.from(matched);
}

/**
 * Auto-enrich an update with mission, entity, and infrastructure associations.
 *
 * Scans the update's title, summary, and content for keyword matches against
 * known missions, entities, and infrastructure projects. Adds discovered
 * associations without removing manually set ones.
 *
 * Also adds contextual tags based on content analysis.
 */
export function enrichUpdate(update: Update): Update {
  const searchText = [update.title, update.summary, update.content || ""].join(" ");

  const missionPatterns = buildMissionPatterns();
  const entityPatterns = buildEntityPatterns();
  const infraPatterns = buildInfrastructurePatterns();

  const discoveredMissions = findMatches(searchText, missionPatterns);
  const discoveredEntities = findMatches(searchText, entityPatterns);
  const discoveredInfra = findMatches(searchText, infraPatterns);

  // Merge with existing associations (don't remove manual ones)
  const missionIds = Array.from(new Set([...update.missionIds, ...discoveredMissions]));
  const entityIds = Array.from(new Set([...update.entityIds, ...discoveredEntities]));
  const infrastructureIds = Array.from(new Set([...update.infrastructureIds, ...discoveredInfra]));

  // Add contextual tags
  const contextTags = inferContextTags(searchText);
  const tags = Array.from(new Set([...update.tags, ...contextTags]));

  return {
    ...update,
    missionIds,
    entityIds,
    infrastructureIds,
    tags,
  };
}

/**
 * Infer contextual tags from text content.
 */
function inferContextTags(text: string): string[] {
  const lower = text.toLowerCase();
  const tags: string[] = [];

  const tagPatterns: [string, string[]][] = [
    ["south-pole", ["south pole", "lunar south"]],
    ["sample-return", ["sample return", "return sample"]],
    ["crewed", ["astronaut", "crewed", "crew aboard"]],
    ["commercial-lunar", ["clps", "commercial lunar"]],
    ["international-cooperation", ["international", "cooperation", "partnership", "jointly"]],
    ["launch", ["launch", "liftoff", "lift-off"]],
    ["landing", ["landing", "touchdown", "surface operations"]],
    ["testing", ["test", "testing", "qualification", "hot-fire"]],
    ["policy", ["policy", "agreement", "treaty", "framework"]],
    ["infrastructure", ["gateway", "habitat", "relay", "infrastructure"]],
  ];

  for (const [tag, keywords] of tagPatterns) {
    if (keywords.some(k => lower.includes(k))) {
      tags.push(tag);
    }
  }

  return tags;
}

/**
 * Enrich a batch of updates.
 */
export function enrichBatch(updates: Update[]): Update[] {
  return updates.map(enrichUpdate);
}
