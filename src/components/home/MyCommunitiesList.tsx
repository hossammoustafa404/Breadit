import { FC, HTMLAttributes } from "react";
import SingleListICommunity from "./SingleListICommunity";
import { cn } from "@lib/utils";

// Types
interface props extends HTMLAttributes<HTMLUListElement> {
  subscriptions: any;
}

const MyCommunitiesList: FC<props> = ({ className, subscriptions }) => {
  return (
    <ul className={cn(className, "flex flex-col gap-4 pl-8")}>
      {subscriptions?.map((item: any) => (
        <SingleListICommunity key={item._id} community={item.community} />
      ))}
    </ul>
  );
};

export default MyCommunitiesList;
