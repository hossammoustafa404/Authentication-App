import { Metadata } from "next";
import ForgetPasswordForm from "./_components/ForgetPasswordForm";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Forget password page",
};

const ForgetPassword = () => {
  return (
    <section>
      <div className="container">
        <article className="max-w-lg mt-16 mx-auto p-6 rounded-md drop-shadow-md border">
          <h2 className="text-center text-xl font-bold capitalize">
            Forget Password
          </h2>
          <ForgetPasswordForm />
        </article>
      </div>
    </section>
  );
};

export default ForgetPassword;
