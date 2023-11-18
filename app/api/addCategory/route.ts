import { NextResponse } from "next/server";
import { fetchJson } from "@/app/lib/api";
import { cookies } from "next/headers";

const { CMS_URL } = process.env;

export async function POST(request: Request) {
  const { category, color, id } = await request.json();
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
      body: JSON.stringify({ category, color, id }),
    });
    if (request.data.attributes.error === "ValidationError") {
      return NextResponse.json(
        { message: `Category exists`, success: false },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: "Category added", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
