"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loading = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.replace("/sign-in");
    }
  }, [session]);

  return <div>Loading</div>;
};

export default Loading;
