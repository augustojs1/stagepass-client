"use client";

import React from "react";

import { User } from "@/models";
import { UsersService } from "@/services";

type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

export const UserContext = React.createContext<IUserContext | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadUser() {
      try {
        const res = await UsersService.getMe();

        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
