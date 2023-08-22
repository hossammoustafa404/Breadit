"use client";

import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@hooks/useToast";
import { useRouter } from "next/navigation";

const useJoinCommunity = (url: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(url);
      return data;
    },
    onError: (error: any) => {
      throw error;
    },
    onSuccess: ({ subscription }: { subscription: any }) => {
      toast({
        title: `Welcome ${subscription?.user?.name}`,
        description: `You have joined ${subscription?.community?.title} community Successfully`,
        variant: "success",
      });
      router.refresh();
    },
  });
};

export default useJoinCommunity;
