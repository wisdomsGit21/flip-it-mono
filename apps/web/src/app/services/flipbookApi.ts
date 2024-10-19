import { api } from "../api";

export const flipbookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserFlipbooks: build.query({
      query: () => "flipbooks",
    }),
    getFlipbook: build.query({
      query: (id) => `flipbooks/${id}`,
    }),
    createFlipbook: build.mutation({
      query: (formData) => ({
        url: "flipbooks",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetFlipbookQuery,
  useCreateFlipbookMutation,
  useGetUserFlipbooksQuery,
} = flipbookApi;
