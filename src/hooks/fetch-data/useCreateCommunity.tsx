"use client";

import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@hooks/useToast";
import { useRouter } from "next/navigation";

// Types

const url = "/api/subreddits";

const useCreateCommunity = (setConflictTitle: any) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: object) => {
      await axios.post(url, payload);
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 409) {
          setConflictTitle(() => true);
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        description: "Community has been created Successfully",
        variant: "success",
      });
      router.push("/");
    },
  });
};

export default useCreateCommunity;
