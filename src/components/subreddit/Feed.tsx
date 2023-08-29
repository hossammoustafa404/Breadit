"use client";

import { PostList } from "@components";
import useGetPosts from "@hooks/fetch-data/useGetPosts";
import { cn } from "@lib/utils";
import { FC, HTMLAttributes } from "react";

// Types
interface props extends HTMLAttributes<HTMLElement> {
  community: CommunityResponse;
}

const Feed: FC<props> = ({ community, className }) => {
  const { data } = useGetPosts({
    community: community._id,
  });

  return (
    <section className={cn(className)}>
      <PostList posts={data?.posts} />
    </section>
  );
};

export default Feed;
