import { CommunityHeader, FakeCreatePost } from "@components";
import LittleInfoBox from "@components/subreddit/LittleInfoBox";
import { getSession } from "@lib/api/nextAuth";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { notFound } from "next/navigation";
import { FC } from "react";

// Types
interface props {
  params: {
    slug: string;
  };
}

const Community: FC<props> = async ({ params: { slug } }) => {
  const session = await getSession();
  let community: CommunityResponse | null = null;

  try {
    const { data, status } = await axios(
      `http://localhost:3000/api/v1/communities/${slug}`
    );

    community = data.community;

    if (status === StatusCodes.NO_CONTENT) {
      return notFound();
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container -translate-y-[2rem]">
      {/* Header */}
      <CommunityHeader community={community} />

      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-6">
        <aside className="lg:basis-[23rem] xl:basis-[30rem]">
          <LittleInfoBox currentUser={session?.user} community={community} />
        </aside>
        <section className="flex-1">
          {community?.subscriptions?.find(
            (item) => item.user === session?.user?._id
          ) && <FakeCreatePost />}
        </section>
      </section>
    </div>
  );
};

export default Community;
