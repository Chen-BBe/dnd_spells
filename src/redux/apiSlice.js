import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DND_BASE_URL = "https://www.dnd5eapi.co";

export const dndQueryApi = createApi({
  reducerPath: 'dndQueryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DND_BASE_URL
  }),
  endpoints: (builder) => ({
    fetchAllSpells: builder.query({
      query: () => '/api/spells',
    }),
    getSpell: builder.query({
      query: (id) => `/api/spells/${id}`,
    }),
  }),
});

export const { 
  useFetchAllSpellsQuery,
  useGetSpellQuery
} = dndQueryApi;