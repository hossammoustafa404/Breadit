"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@hooks/useToast";
import { useRouter } from "next/navigation";

const useLeaveCommunity = (url: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationKey: ["leave-community"],
    mutationFn: async () => {
      const { data } = await axios.delete(url);
      console.log("Hello");

      return data;
    },
    onError: (error: any) => {
      throw error;
    },
    onSuccess: () => {
      toast({
        title: `Hope you to come back soon`,
        description: `You have leaved the community`,
        variant: "success",
      });
      router.refresh();
    },
  });
};

export default useLeaveCommunity;
