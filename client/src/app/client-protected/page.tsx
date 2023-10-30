"use client";

import Protected from "@components/Protected";
import { Button } from "@components/ui/Button";
import { useAppSelector } from "@hooks/redux";
import useAxiosPrivate from "@lib/api/hooks/useAxiosPrivate";
import { useRefresh } from "@lib/api/hooks/auth";
import { selectAuthUser } from "@lib/redux/features/auth";
import { useEffect, useState } from "react";

const ClientProtected = () => {
  const refresh = useRefresh();
  const [users, setUsers] = useState<any>([]);
  const axiosPrivate = useAxiosPrivate();

  const authUser = useAppSelector(selectAuthUser);

  useEffect(() => {
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const {
          data: { users },
        } = await axiosPrivate.get("/users", { signal: controller.signal });
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };

    if (authUser) {
      getUsers();
    }

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Protected redirectUrl="/client-protected">
      <div className="container">Client Protected</div>
      <div className="mt-8">
        {users.map((user: any) => (
          <h3 key={user.id}>{user.first_name}</h3>
        ))}
      </div>

      <Button
        onClick={async () => {
          const accessToken = await refresh();
        }}
      >
        Refresh
      </Button>
    </Protected>
  );
};

export default ClientProtected;
