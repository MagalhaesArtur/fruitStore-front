"use client";
import { AppWrapper } from "@/context";
import { RequireAuth } from "@/context/auth/RequireAuth";
import Sidebar from "../components/Sidebar";
import { JSX } from "react";

const protectedLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <RequireAuth>
      <AppWrapper>
        <Sidebar>{children}</Sidebar>
      </AppWrapper>
    </RequireAuth>
  );
};

export default protectedLayout;
