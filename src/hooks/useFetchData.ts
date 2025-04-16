import { useQuery, useMutation } from '@tanstack/react-query';

import type { ResourceSchema } from 'ts-swapi';

export type useFetchDataType = {
  param?: keyof ResourceSchema;
  query?: string;
};

const api = process.env.NEXT_PUBLIC_API_HOST

export const useGetData = ({ param, query }: useFetchDataType) => {
  return useQuery({
    queryKey: [`${param}`, param],
    queryFn: async () => {
      const res = await fetch(
        `${api}/${param}${query ? `/${query}` : ''}`
      );
      return await res.json();
    },
  });
};

export const useSetData = ({ param, query }: useFetchDataType) => {
  const { refetch } = useGetData({ param, query });

  return useMutation({
    mutationFn: async ({ param, query }: useFetchDataType) => {
      const res = await fetch(
        `${api}/${param}${query ? `/${query}` : ''}`
      );
      return await res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });
};
