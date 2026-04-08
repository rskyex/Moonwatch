import { NextResponse } from "next/server";
import { runSingleIngestion } from "@/lib/ingestion";
import { adapters } from "@/adapters";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const { sourceId } = await params;

  // Optional API key check
  const apiKey = process.env.MOONWATCH_API_KEY;
  if (apiKey) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!adapters[sourceId]) {
    return NextResponse.json(
      {
        error: `Adapter not found: ${sourceId}`,
        available: Object.keys(adapters),
      },
      { status: 404 },
    );
  }

  try {
    const result = await runSingleIngestion(sourceId);
    return NextResponse.json({
      success: true,
      sourceId,
      timestamp: result.timestamp,
      itemCount: result.finalUpdates.length,
      errors: result.errors,
      updates: result.finalUpdates.slice(0, 5).map((u) => ({
        id: u.id,
        title: u.title,
        date: u.date,
        significance: u.significance,
      })),
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
