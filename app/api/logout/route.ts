import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  try {
    const serialized = serialize("jwt", "", {
      path: "/api",
      expires: new Date(0),
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
