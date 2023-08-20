"use client";

import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

const url = "/api/subreddits";
const usePostData = () => {
  return useMutation({
    mutationFn: async (payload: object) => {
      try {
        await axios.post(url, payload);
        
      } catch (error) {
        throw error;
      }
    },
  });
};

export default usePostData;
