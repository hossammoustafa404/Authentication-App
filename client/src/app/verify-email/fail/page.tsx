import SendVerifyEmailBtn from "@components/SendVerifyEmailBtn";
import { XCircle } from "lucide-react";

const Fail = () => {
  return (
    <section>
      <div className="container">
        <div className="mt-[8rem]">
          <h3 className="text-center mb-4 font-bold text-xl">Ooops!</h3>
          <div className="flex items-center justify-center gap-x-4">
            <XCircle className="text-red-500" />
            <p>Failed to verify your email</p>
          </div>
          <SendVerifyEmailBtn className="mx-auto block" />
        </div>
      </div>
    </section>
  );
};

export default Fail;
