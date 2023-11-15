import { fetchJson } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

const useCategoryQuery = (firstDayOfMonth: string, lastDayOfMonth: string) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        return await fetchJson(
          `/api/expenses?first=${firstDayOfMonth}&last=${lastDayOfMonth}`,
        );
      } catch (err) {
        return null;
      }
    },
  });
  return { data: query.data, isLoading: query.isLoading, query };
};

export default useCategoryQuery;
