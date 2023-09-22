"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isFetchEnabled, setisFetchEnabled] = useState<boolean>(true);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await fetchJson("/api/user");
      } catch (err) {
        return null;
      }
    },
    staleTime: Infinity,
    cacheTime: 30_000, //ms
    refetchInterval: 30_000,
    enabled: isFetchEnabled,
  });
  if (!query.data && !query.isLoading && isFetchEnabled) {
    setisFetchEnabled(false);
  }

  console.log(query.data);

  if (!query.data && !query.isLoading) router.push("/");
  if (query.isLoading) return <h1>Loading...</h1>

  return <h1>Welcome {query.data.user}</h1>;
}
