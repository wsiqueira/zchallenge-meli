import { useQuery } from '@tanstack/react-query';

type useGetDataTypes = {
  param: 'films' | 'people' | 'planets' | 'species' | 'starships' | 'vehicles';
  id?: number;
};

export const useGetData = ({ param, id }: useGetDataTypes) => {
  return useQuery({
    queryKey: [`get-${param}`, param],
    queryFn: async () => {
      const res = await fetch(
        `https://swapi.dev/api/${param}${id ? `/${id}` : ''}`
      );

      return await res.json();
    },
  });
};
