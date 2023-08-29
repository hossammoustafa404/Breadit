"use client";

import { FC, HTMLAttributes, useRef } from "react";
import UserAvatar from "./UserAvatar";
import Output from "editorjs-react-renderer";

// Types
interface props extends HTMLAttributes<HTMLLIElement> {
  post: PostResponse;
}

const PostItem: FC<props> = ({ post }) => {
  const postRef = useRef<HTMLLIElement>(null);

  return (
    <li
      className="bg-white rounded-md p-6 max-h-[30rem] relative overflow-hidden"
      ref={postRef}
    >
      {/* User */}
      <div className="flex items-center gap-1.5 mb-4">
        <UserAvatar image={post.author.image} />
        <p>{post?.author.name}</p>
      </div>

      {/* Post Content */}
      <div>
        <h5 className="font-semibold">{post.title}</h5>
        <div>
          <Output data={post.content} />
        </div>
      </div>

      {postRef.current && postRef.current.clientHeight >= 160 && (
        <div className="absolute left-0 bottom-0 w-full h-[5rem] bg-gradient-to-t from-white to-transparent" />
      )}
    </li>
  );
};

export default PostItem;
