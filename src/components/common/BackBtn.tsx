"use client";
import { Button, ButtonProps } from "@components/ui/Button";
import { cn } from "@lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

// Types
interface props extends ButtonProps {}

const BackBtn: FC<props> = ({ className, ...props }) => {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      onClick={() => router.back()}
      className={cn(className)}
      {...props}
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackBtn;
