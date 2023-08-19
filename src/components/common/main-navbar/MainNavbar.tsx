import Link from "next/link";
import { Logo } from "@components";
import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/Button";
import { getSession } from "@server/lib/nextAuth";
import NavProfileMenu from "./NavProfileMenu";
import { FC } from "react";

const MainNavbar: FC = async () => {
  const session = await getSession();
  console.log(session?.user);

  return (
    <nav className="sticky top-0 bg-white drop-shadow-sm py-4 mb-8">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Logo size="lg" />

        {/* Search Form */}
        <form className="basis-[30rem] border border-red-500 mx-16 hidden">
          <div>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full outline-none"
            />
          </div>
        </form>

        {/* Actions */}
        {!session?.user ? (
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants(),
              "flex-shrink-0 rounded-3xl bg-primary"
            )}
          >
            Sign In
          </Link>
        ) : (
          <NavProfileMenu user={session?.user} />
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
