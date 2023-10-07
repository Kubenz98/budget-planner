import { NextResponse } from "next/server";
import { fetchJson } from "@/app/lib/api";
import { cookies } from "next/headers";

const { CMS_URL } = process.env;

export async function GET() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");
  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const user = await fetchJson(`${CMS_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt.value}`,
      },
    });
    return NextResponse.json(
      { name: user.username, id: user.id },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
