"use client";

import { Button } from "@components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";
import useJoinCommunity from "@hooks/fetch-data/useJoinCommunity";
import useLeaveCommunity from "@hooks/fetch-data/useLeaveCommunity";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

// Types
interface props extends DropdownMenuProps {
  currentUser: User | undefined;
  community: CommunityResponse | null;
}

const MoreMenu: FC<props> = ({ currentUser, community, ...props }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { mutateAsync: joinCommunity } = useJoinCommunity(
    `/api/v1/communities/${community?.title}/subscriptions`
  );
  // Join community handler
  const joinCommunityHandler = async () => {
    await joinCommunity();
  };

  const { mutateAsync: leaveCommunity } = useLeaveCommunity(
    `/api/v1/communities/${community?.title}/subscriptions`
  );

  // Leave community handler
  const leaveCommunityHandler = async () => {
    await leaveCommunity();
  };

  return (
    <DropdownMenu {...props}>
      {/* Trigger */}
      <DropdownMenuTrigger className="outline-none">
        <div className="bg-gray-300 py-1 px-2 rounded-sm hover:bg-gray-300/80 duration-300">
          <MoreHorizontal />
        </div>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathName}/members`)}
            className="w-full"
          >
            Members
          </Button>
        </DropdownMenuItem>
        {currentUser && currentUser?._id !== community?.superAdmin?._id && (
          <DropdownMenuItem className="">
            {community?.subscriptions?.find(
              (item: any) => item.user === currentUser?._id
            ) ? (
              <Button
                variant="ghost"
                className="w-full text-red-500 hover:text-red-500"
                onClick={leaveCommunityHandler}
              >
                Leave
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full text-green-500 hover:text-green-500"
                onClick={joinCommunityHandler}
              >
                Join
              </Button>
            )}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreMenu;
