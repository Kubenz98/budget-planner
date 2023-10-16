import { fetchJson } from "@/app/lib/api";
import { useMutation } from "@tanstack/react-query";

interface CategoryVariables {
  category: string;
  color: string;
}

const useCategory = () => {
  const mutation = useMutation<CategoryVariables, Error, CategoryVariables>(
    ({ category, color }) =>
      fetchJson("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, color }),
      }),
  );

  const addCategory = async (category: string, color: string) => {
    try {
      const response = await mutation.mutateAsync({ category, color });
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    addCategory,
    isLoading: mutation.isLoading,
    hookError: mutation.isError,
  };
};

export default useCategory;
