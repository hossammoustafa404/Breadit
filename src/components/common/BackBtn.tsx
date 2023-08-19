"use client";
import { Button } from "@components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();

  return (
    <Button variant={"ghost"} onClick={() => router.back()}>
      <ArrowLeft />
    </Button>
  );
};

export default BackBtn;
