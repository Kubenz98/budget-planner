import { fetchJson } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: number;
  name: string;
}

interface SignUpVariables {
  username: string;
  email: string;
  password: string;
}

const useSignUp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<User, Error, SignUpVariables>(
    ({ username, email, password }) =>
      fetchJson("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
  );

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const user = await mutation.mutateAsync({ username, email, password });
      queryClient.setQueryData(["user"], user);
      return true;
    } catch (err) {
      return false;
    }
  };

  return { signUp, isLoading: mutation.isLoading, hookError: mutation.isError };
};

export default useSignUp;
