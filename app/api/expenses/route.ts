import { fetchJson } from "@/app/lib/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const { CMS_URL } = process.env;

export async function GET(req: NextRequest) {
  const firstDayOfMonth = req.nextUrl.searchParams.get("first");
  const lastDayOfMonth = req.nextUrl.searchParams.get("last");
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");
  if (!jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const expenses = await fetchJson(
    `${CMS_URL}/api/allocated-expenses?filters[date][$gte]=${firstDayOfMonth}&filters[date][$lte]=${lastDayOfMonth}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt.value}`,
        "Content-Type": "application/json",
      },
    },
  );
  const stripExpenses = expenses.data.map((expense) => ({
    id: expense.id,
    name: expense.attributes.name,
    color: expense.attributes.color,
    amount: expense.attributes.amount ? expense.attributes.amount : 0,
  }));
  try {
    return NextResponse.json(stripExpenses, { status: 200 });
  } catch (error: any) {}
}
