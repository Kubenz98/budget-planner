import { fetchJson } from "@/app/lib/api";
import { useMutation } from "@tanstack/react-query";

interface CategoryVariables {
  category: string;
  color: string;
}

interface CategoryResponse {
  message: string;
  success: boolean;
}

const useCategory = () => {
  const mutation = useMutation<CategoryResponse, Error, CategoryVariables>(
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
      return response;
    } catch (err) {
      return JSON.parse(err.responseText);
    }
  };

  return {
    addCategory,
    error: mutation.error,
    isLoading: mutation.isLoading,
  };
};

export default useCategory;
