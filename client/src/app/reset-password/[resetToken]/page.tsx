import { Metadata } from "next";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset password page",
};

const ResetPassword = ({
  params: { resetToken },
}: {
  params: { resetToken: string };
}) => {
  return (
    <section>
      <div className="container">
        <article className="max-w-lg mt-16 mx-auto p-6 rounded-md drop-shadow-md border">
          <h2 className="text-center text-xl font-bold capitalize">
            Reset Password
          </h2>
          <ResetPasswordForm resetToken={resetToken} />
        </article>
      </div>
    </section>
  );
};

export default ResetPassword;
