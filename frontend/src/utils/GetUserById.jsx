import useSWR from 'swr';
import fetcher from "./fetcher";

export const useUser = (userId) => {
  const { data: user, error } = useSWR(
    () =>
      userId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`
        : null,
    fetcher
  );

  return {
    user: user,
    isLoading: !error && !user, // Correct reference to `user` instead of `data`
    isError: error,
  };
};
