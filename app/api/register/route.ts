import { fetchJson } from "@/app/lib/api";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

const { CMS_URL } = process.env;

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  try {
    const { jwt, user } = await fetchJson(
      `${CMS_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const serialized = serialize("jwt", jwt, {
      httpOnly: true,
      path: "/api",
    });
    const response = {
      success: true,
      name: user.username,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
