"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@hooks/useToast";
import { useRouter } from "next/navigation";
import { StatusCodes } from "http-status-codes";
import { createCommunityPayload } from "@lib/validators/forms/createCommunity";

const url = "/api/v1/communities";

const useCreateCommunity = (setConflictTitle: any) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: createCommunityPayload) => {
      const { data } = await axios.post(url, payload);
      return data;
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === StatusCodes.CONFLICT) {
          setConflictTitle(() => true);
        }
      }
    },
    onSuccess: ({ community }: { community: CommunityResponse }) => {
      toast({
        description: `${community.title} community has been created Successfully`,
        variant: "success",
      });
      router.push(`/r/${community.title}`);
    },
  });
};

export default useCreateCommunity;
