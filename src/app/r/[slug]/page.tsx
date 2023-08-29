import { CommunityHeader, FakeCreatePost } from "@components";
import Feed from "@components/subreddit/Feed";
import LittleInfoBox from "@components/subreddit/LittleInfoBox";
import { getSession } from "@lib/api/nextAuth";
import getCommunity from "@lib/fetch-data/getCommunity";

import { FC } from "react";

// Types
interface props {
  params: {
    slug: string;
  };
}

const Community: FC<props> = async ({ params: { slug } }) => {
  const session = await getSession();

  const { community } = await getCommunity(slug);

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
            (item: any) => item.user === session?.user?._id
          ) && <FakeCreatePost />}
          <Feed community={community} className="mt-6" />
        </section>
      </section>
    </div>
  );
};

export default Community;
