import { buttonVariants } from "@components/ui/Button";
import { cn } from "@lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

// Types
interface props extends HTMLAttributes<HTMLElement> {}
const CreateCommunityAction: FC<props> = ({ className }) => {
  return (
    <article className={cn(className)}>
      <header className="bg-indigo-300 p-4">
        <div className="flex gap-1.5 items-center">
          <HomeIcon className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Home</h2>
        </div>
      </header>
      <div className="p-4 ">
        <p className="text-gray-500">
          Your personal Breadit front page. Come here to check in with your
          favourite communities
        </p>
        <Link
          href="/r/create-community"
          className={cn(buttonVariants(), "rounded-md w-full mt-6")}
        >
          Create Community
        </Link>
      </div>
    </article>
  );
};

export default CreateCommunityAction;
