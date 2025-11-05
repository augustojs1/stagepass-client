"use client";

import React from "react";

import { User } from "@/models";

type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = React.createContext<IUserContext | null>(null);

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUser] = React.useState<User | null>(user);

  React.useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
