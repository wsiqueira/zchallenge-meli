import { useQuery, useMutation } from '@tanstack/react-query';

import type { ResourceSchema } from 'ts-swapi';

export type useFetchDataType = {
  param?: keyof ResourceSchema;
  query?: string;
};

export const useGetData = ({ param, query }: useFetchDataType) => {
  return useQuery({
    queryKey: [`${param}`, param],
    queryFn: async () => {
      const res = await fetch(
        `https://swapi.dev/api/${param}${query ? `/${query}` : ''}`
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
        `https://swapi.dev/api/${param}${query ? `/${query}` : ''}`
      );
      return await res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });
};
