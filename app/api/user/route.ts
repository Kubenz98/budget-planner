import { NextResponse } from "next/server";
import { fetchJson } from "../../lib/api";
import { cookies } from "next/headers";

const { CMS_URL} = process.env;

export async function GET() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt").value;
  try {
    const user = await fetchJson(`${CMS_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return NextResponse.json(
      { user: user.username, id: user.id },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
