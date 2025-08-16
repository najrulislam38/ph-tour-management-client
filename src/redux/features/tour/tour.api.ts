import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation({
      query: (TourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: TourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getAllTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateTourTypeMutation, useGetAllTourTypesQuery } = tourApi;
