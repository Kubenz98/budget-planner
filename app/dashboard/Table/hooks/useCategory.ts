import { fetchJson } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchJson("/api/category"),
  });

  return {
    getCategories,
  };
};
