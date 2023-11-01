import BackBtn from "@components/BackBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "Unauthorized page",
};

const UnAuthorized = () => {
  return (
    <section>
      <div className="container">
        <div className="mt-10 flex flex-col items-center gap-y-6">
          <h2>UnAuthorized</h2>
          <p>You are not allowed to navigate this page</p>

          <BackBtn />
        </div>
      </div>
    </section>
  );
};

export default UnAuthorized;
