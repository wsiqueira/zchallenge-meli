import { useQuery } from '@tanstack/react-query';

import type { ResourceSchema } from 'ts-swapi';

export type useGetDataTypes = {
  param: keyof ResourceSchema;
  query?: string
};

export const useGetData = ({ param, query }: useGetDataTypes) => {
  return useQuery({
    queryKey: [`get-${param}`, param],
    queryFn: async () => {
      const res = await fetch(
        `https://swapi.dev/api/${param}${query ? `/${query}` : ''}`
      );

      return await res.json();
    },
  });
};
