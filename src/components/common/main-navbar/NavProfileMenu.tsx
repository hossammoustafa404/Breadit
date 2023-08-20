"use client";

import { Button } from "@components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";
import { FC } from "react";
import UserAvatar from "../UserAvatar";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

// Types
interface props extends DropdownMenuProps {
  user: User;
}

const NavProfileMenu: FC<props> = ({ user, ...props }) => {
  const router = useRouter();

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar image={user?.image as string} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/my-profile")}
            className="h-0 font-bold"
          >
            Profile
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="h-0"
          >
            Feed
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/r/create-community")}
            className="h-0"
          >
            Create Community
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/settings")}
            className="h-0"
          >
            Settings
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button
            variant="ghost"
            className="h-0"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            SignOut
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileMenu;
