import SigninForm from "@app/signin/_components/SigninForm";
import { buttonVariants } from "@components/ui/Button";
import { Separator } from "@components/ui/Separator";
import { cn } from "@utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in page",
};

const Signin = () => {
  return (
    <section>
      <div className="container">
        <article className="max-w-lg mt-16 mx-auto p-6 rounded-md drop-shadow-md border">
          <h2 className="text-center text-xl font-bold capitalize">sign in</h2>
          <SigninForm className="mt-6" />
          <Separator
            orientation="horizontal"
            className="mt-10 max-w-sm mx-auto bg-slate-400 dark:bg-slate-300"
          />
          <Link
            href="/forget-password"
            className={cn(
              buttonVariants({ variant: "link" }),
              "capitalize mt-6 px-0 text-blue-600 dark:text-blue-600 font-semibold"
            )}
          >
            forgetten password?
          </Link>
          <p className="text-sm">
            Do not have an account?{" "}
            <Link
              href="signup"
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-semibold capitalize text-blue-600 dark:text-blue-600 mx-0 px-0"
              )}
            >
              sign up
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Signin;
