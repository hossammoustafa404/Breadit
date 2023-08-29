"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { useToast } from "@hooks/useToast";
import { useRouter } from "next/navigation";
import { PostPayload } from "@lib/validators/post";

const url = "/api/v1/posts";

const useCreatePost = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: PostPayload) => {
      const { data } = await axios.post(url, payload);
      return data;
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: ({ post }) => {
      toast({
        description: `Post has been created Successfully`,
        variant: "success",
      });
      router.push(`/r/${post.community.title}`);
    },
  });
};

export default useCreatePost;
