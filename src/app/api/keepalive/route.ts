import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase not configured" },
      { status: 503 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const healthCheckUrl = `${url}/rest/v1/dive_sites?select=id&limit=1`;

  try {
    const res = await fetch(healthCheckUrl, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        {
          ok: false,
          status: res.status,
          error: "Supabase keepalive query failed",
          details: errorBody.slice(0, 500),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Keepalive request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
