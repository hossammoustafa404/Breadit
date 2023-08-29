import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const useGetCommunity = (slug: string) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/communities/${slug}`);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === StatusCodes.NO_CONTENT) {
          return notFound();
        }
      }
    },
  });
};

export default useGetCommunity;
