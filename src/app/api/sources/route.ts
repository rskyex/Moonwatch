import { NextResponse } from "next/server";
import { adapters, checkAllSources } from "@/adapters";

export async function GET() {
  const healthChecks = await checkAllSources();

  const sources = Object.entries(adapters).map(([id, adapter]) => ({
    id,
    name: adapter.config.name,
    sourceType: adapter.config.sourceType,
    reliability: adapter.config.reliability,
    enabled: adapter.config.enabled,
    endpoints: adapter.config.endpoints,
    pollIntervalMinutes: adapter.config.pollIntervalMinutes,
    maxItems: adapter.config.maxItems,
    healthy: healthChecks[id] ?? false,
  }));

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    sources,
    summary: {
      total: sources.length,
      enabled: sources.filter((s) => s.enabled).length,
      healthy: sources.filter((s) => s.healthy).length,
    },
  });
}
