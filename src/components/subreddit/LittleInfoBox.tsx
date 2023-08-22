import { cn } from "@lib/utils";
import { Axe, CalendarDays } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { format } from "date-fns";
import { User } from "next-auth";

// Types
interface props extends HTMLAttributes<HTMLElement> {
  currentUser: User | undefined;
  community: CommunityResponse | null;
}

const LittleInfoBox: FC<props> = ({ className, currentUser, community }) => {
  return (
    <section className={cn(className, "p-8 rounded-md bg-white")}>
      <ul>
        {/* Creator */}
        <li className="flex gap-2.5 mb-6">
          <Axe />
          <p className="text-slate-700">
            Created by{" "}
            {community?.superAdmin?._id === currentUser?._id
              ? "you"
              : community?.superAdmin?.name}
          </p>
        </li>

        {/* Time */}
        <li className="flex gap-2.5 mb-6">
          <CalendarDays />
          <time className="text-slate-700">
            Created in{" "}
            {community && format(new Date(community.createdAt), "MMMM d, yyyy")}
          </time>
        </li>
      </ul>
    </section>
  );
};

export default LittleInfoBox;
