"use client";
import { redirect } from "next/navigation"
import useUser from "@/app/hooks/useUser";

export default function Dashboard() {
  const { user, userIsLoading } = useUser();
  console.log(user);

  if (!user && !userIsLoading) {
    redirect("/")
  }
  if (user) return <h1>Welcome {user.name}</h1>;
}
