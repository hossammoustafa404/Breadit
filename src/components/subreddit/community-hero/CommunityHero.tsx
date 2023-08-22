import { cn } from "@lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import MoreMenu from "./MoreMenu";
import { getSession } from "@lib/api/nextAuth";
import { Session } from "next-auth";

// Types
interface props extends HTMLAttributes<HTMLElement> {
  community: CommunityResponse | null;
}

// Component
const CommunityHero: FC<props> = async ({ className, community }) => {
  const session: Session | null = await getSession();

  return (
    <section className={cn(className)}>
      <div className="relative h-[20rem]">
        <Image
          src="/imgs/default-community-cover.jpg"
          fill
          alt="Community Cover"
        />
      </div>

      <div className="flex justify-between bg-white rounded-b-md p-6 items-center">
        <div>
          <h2 className="font-bold text-xl">r/{community?.title}</h2>
          <p className="text-gray-500 mt-1">
            {(community?.subscriptions?.length as number) + 1} members
          </p>
        </div>

        {/* DropMenu */}
        <MoreMenu currentUser={session?.user} community={community} />
      </div>
    </section>
  );
};

export default CommunityHero;
