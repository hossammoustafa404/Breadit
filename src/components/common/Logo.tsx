import Link from "next/link";
import Icons from "./Icons";
import { FC, HTMLAttributes } from "react";
import { cn } from "@lib/utils";

// Types
interface props extends HTMLAttributes<HTMLAnchorElement> {
  size?: "lg" | "md" | "sm";
}

const Logo: FC<props> = ({ className, size }) => {
  return (
    <Link href="/" className={cn(className, "w-fit flex items-center gap-2.5")}>
      <Icons.Logo
        className={cn(
          size === "lg" ? "w-8 h-8" : size === "sm" ? "w-4 h-4" : "w-6 h-6"
        )}
      />
      <h1
        className={cn(
          size === "lg" ? "text-xl" : size === "sm" ? "text-md" : "text-lg",
          "hidden font-semibold sm:block text-primary"
        )}
      >
        Breadit
      </h1>
    </Link>
  );
};

export default Logo;
