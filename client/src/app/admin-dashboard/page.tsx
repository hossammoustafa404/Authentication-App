import Protected from "@components/Protected";

const AdminDashboard = () => {
  return (
    <Protected redirectUrl="/admin-dashboard" roles={["super_admin"]}>
      <div className="container">Admin Dashboard</div>;
    </Protected>
  );
};

export default AdminDashboard;
