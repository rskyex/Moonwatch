import { NextResponse } from "next/server";
import { runIngestion } from "@/lib/ingestion";
import { registerIngestedUpdates } from "@/lib/data-access";

export async function POST(request: Request) {
  // Optional API key check
  const apiKey = process.env.MOONWATCH_API_KEY;
  if (apiKey) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await runIngestion();

    // Register ingested updates so they appear in queries
    registerIngestedUpdates(result.finalUpdates);

    return NextResponse.json({
      success: true,
      timestamp: result.timestamp,
      sources: result.fetchResults.map((r) => ({
        sourceId: r.sourceId,
        success: r.success,
        itemCount: r.itemCount,
        error: r.error,
      })),
      pipeline: {
        normalized: result.normalizedCount,
        deduplicated: result.deduplicatedCount,
        enriched: result.enrichedCount,
        final: result.finalUpdates.length,
      },
      errors: result.errors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// GET returns pipeline status info
export async function GET() {
  const { getEnabledAdapters } = await import("@/adapters");
  const enabled = getEnabledAdapters();
  return NextResponse.json({
    adapters: enabled.map((a) => ({
      id: a.config.id,
      name: a.config.name,
      enabled: a.config.enabled,
      endpoints: a.config.endpoints,
      pollIntervalMinutes: a.config.pollIntervalMinutes,
    })),
  });
}
