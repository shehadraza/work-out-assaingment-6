import { NextResponse } from "next/server";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function GET() {
  try {
    const response = await fetch(BASE_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to load workouts" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Workout API error:", error);

    return NextResponse.json(
      { message: "Unable to connect to workout API" },
      { status: 500 }
    );
  }
}