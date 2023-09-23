import { NextResponse } from "next/server";
import { fetchJson } from "../../lib/api";
import { serialize } from "cookie";

const { CMS_URL } = process.env;

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    });

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
