import { fetchJson } from "@/app/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

interface ExpenseData {
  id: number;
  name: string;
  color: string;
  amount: number;
}

interface ExpensesVariables {
  firstDayOfMonth: string;
  lastDayOfMonth: string;
}

export const useGetCategories = () => {
  const mutation = useMutation<ExpenseData[], Error, ExpensesVariables>(
    ({ firstDayOfMonth, lastDayOfMonth }) =>
      fetchJson(
        `/api/expenses?first=${firstDayOfMonth}&last=${lastDayOfMonth}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
  );

  const getMonthlyData = useCallback(
    async (firstDayOfMonth: string, lastDayOfMonth: string) => {
      try {
        const response = await mutation.mutateAsync({
          firstDayOfMonth,
          lastDayOfMonth,
        });
        return response;
      } catch (err) {
        console.log(err);
        return JSON.parse(err.responseText);
      }
    },
    // eslint-disable-next-line
    [mutation.mutateAsync],
  );

  return {
    getMonthlyData,
    mutation,
  };
};
