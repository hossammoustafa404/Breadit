"use client";

import { Button, ButtonProps } from "@components/ui/Button";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "@components";
import { useToast } from "@hooks/useToast";
import { cn } from "@lib/utils";

// Types
interface props extends ButtonProps {}

const SignInBtn: FC<props> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Handle Click
  const handleClick = async () => {
    setIsLoading(() => true);
    try {
      await signIn("google", { redirect: false });
    } catch (error) {
      toast({
        description: "Something went wrong, try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(() => false);
    }
  };
  return (
    <Button
      className={cn(className, "bg-black hover:bg-black/80 w-full mb-2")}
      {...props}
      isLoading={isLoading}
      onClick={handleClick}
    >
      {!isLoading && <Icons.Google className="w-4 h-4 mr-2" />}
      <span className="hidden sm:inline mr-1">Continue With</span>Google
    </Button>
  );
};

export default SignInBtn;
