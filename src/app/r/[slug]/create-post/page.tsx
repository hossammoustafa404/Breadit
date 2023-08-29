import "@styles/editor.css";

import { AppEditor, BackBtn } from "@components";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { notFound } from "next/navigation";
import getCommunity from "@lib/fetch-data/getCommunity";

const CreatePost = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { community } = await getCommunity(slug);

  return (
    <section>
      <div className="container">
        <BackBtn />
        <div className="mx-auto mt-6 max-w-3xl">
          <AppEditor community={community} />
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
