"use client";

import { UserAvatar } from "@components";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/form/Input";
import { Image, Link, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const FakeCreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <article className="p-6 bg-white rounded-md">
      <div className="flex items-center gap-2.5">
        <UserAvatar image={session?.user?.image as string} />
        <Input
          readOnly
          placeholder="Share your ideas with the community"
          className="cursor-pointer"
          onClick={() => router.push(pathname + "/create-post")}
        />
      </div>
      <div className="mt-4 flex gap-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(pathname + "/create-post")}
        >
          <Image className="text-green-700" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(pathname + "/create-post")}
        >
          <Video className="text-red-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(pathname + "/create-post")}
        >
          <Link className="text-blue-500" />
        </Button>
      </div>
    </article>
  );
};

export default FakeCreatePost;
