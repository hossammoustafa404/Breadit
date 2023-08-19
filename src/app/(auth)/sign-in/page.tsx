import { BackBtn, SignInBtn } from "@components";
import { buttonVariants } from "@components/ui/Button";
import { cn } from "@lib/utils";
import { getSession } from "@server/lib/nextAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

// MetaData
export const metadata = {
  title: "Sign In",
  description: "Sign in page",
};

// Page Component
const SignIn: FC = async () => {
  // If you sign in you can not navigate this page
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <section>
      <div className="container">
        <BackBtn />

        {/* Sign in */}
        <article className="max-w-md mx-auto mt-12 text-center bg-white p-6 rounded-md drop-shadow-md">
          <h2 className="text-xl text-black mb-8 font-bold">Sign In</h2>
          <SignInBtn />
          <p className="text-sm mt-4 ">
            If you are a new user you should know that by continuing, you are
            setting up a Breadit account and agree to our{" "}
            <Link
              href="/user-agreement"
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 h-0 text-secondary"
              )}
            >
              User Agreement
            </Link>{" "}
            and{" "}
            <Link
              href="/user-agreement"
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 h-0 text-secondary"
              )}
            >
              Privacy Policy
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default SignIn;
