"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "/api/v1/posts";

const useGetPosts = (query: {
  community: string;
  limit?: number;
  page?: number;
}) => {
  const queryString = Object.keys(query)
    .map((key: string) => {
      return `${key}=${query[key]}`;
    })
    .join("&");

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}?${queryString}`);
      return data;
    },
  });
};

export default useGetPosts;
