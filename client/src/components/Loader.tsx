import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed top-0 w-screen h-screen z-40 bg-slate-500 flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loader;
