import Protected from "@components/Protected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Protectd",
  description: "Server protected page",
};

const ServerProtected = () => {
  return (
    <Protected redirectUrl="/server-protected">
      <div className="container">Server Protected</div>
    </Protected>
  );
};

export default ServerProtected;

// A Server side page
