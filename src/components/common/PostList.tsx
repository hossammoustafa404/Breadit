import { FC, HTMLAttributes } from "react";
import PostItem from "./PostItem";

// Types
interface props extends HTMLAttributes<HTMLUListElement> {
  posts: PostResponse[] | undefined;
}

const PostList: FC<props> = ({ posts }) => {
  return (
    <ul className="flex flex-col gap-y-6">
      {posts?.map((post: any) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
