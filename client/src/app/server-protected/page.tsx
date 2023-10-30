import Protected from "@components/Protected";

const ServerProtected = () => {
  return (
    <Protected redirectUrl="/server-protected">
      <div className="container">Server Protected</div>
    </Protected>
  );
};

export default ServerProtected;

// A Server side page
