import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { notFound } from "next/navigation";

const getCommunity = async (slug: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/communities/${slug}`
    );
    console.log("Hello");

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        return notFound();
      }
    }
  }
};

export default getCommunity;
