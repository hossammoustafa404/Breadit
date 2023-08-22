import { cn } from "@lib/utils";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

// Types
interface props extends HTMLAttributes<HTMLLIElement> {
  community: any;
}

const SingleListICommunity: FC<props> = ({ community, className }) => {
  return (
    <li className={cn(className)}>
      <Link
        href={`/r/${community?.title}`}
        className="font-semibold hover:text-black/80"
      >
        r/{community?.title}
      </Link>
    </li>
  );
};

export default SingleListICommunity;
