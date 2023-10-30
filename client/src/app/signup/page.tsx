import SignupForm from "@app/signup/_components/SignupForm";
import { buttonVariants } from "@components/ui/Button";
import { Separator } from "@components/ui/Separator";
import { cn } from "@utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up page",
};

const SignUp = () => {
  return (
    <section>
      <div className="container">
        <article className="max-w-lg mt-16 mx-auto p-6 rounded-md drop-shadow-md border">
          <h2 className="text-center text-xl font-bold capitalize">sign up</h2>
          <SignupForm className="mt-6" />
          <p className="text-sm mt-8">
            By creating an account, you agree to Amazing Store{" "}
            <Link
              href="/conditions-of-use"
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-semibold capitalize text-blue-600 dark:text-blue-600 mx-0 px-0"
              )}
            >
              conditions of use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-notice"
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-semibold capitalize text-blue-600 dark:text-blue-600 mx-0 px-0"
              )}
            >
              privacy notice
            </Link>
          </p>
          <Separator
            orientation="horizontal"
            className="mt-10 max-w-sm mx-auto bg-slate-400 dark:bg-slate-300"
          />

          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="signin"
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-semibold capitalize text-blue-600 dark:text-blue-600 mx-0 px-0"
              )}
            >
              sign in
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default SignUp;
