import Protected from "@components/Protected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard page",
};

const AdminDashboard = () => {
  return (
    <Protected redirectUrl="/admin-dashboard" roles={["super_admin"]}>
      <div className="container">Admin Dashboard</div>;
    </Protected>
  );
};

export default AdminDashboard;
