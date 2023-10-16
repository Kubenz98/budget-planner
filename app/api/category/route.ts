import { NextResponse } from "next/server";
import { fetchJson } from "@/app/lib/api";
import { cookies } from "next/headers";

const { CMS_URL } = process.env;

export async function POST(request: Request) {
  const { category, color } = await request.json();
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");
  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const request = await fetchJson(`${CMS_URL}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, color }),
    });
    return NextResponse.json(
      { message: `${request.data.attributes.name} category added!` },
      { status: 200 },
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
