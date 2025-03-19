"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [onCreateSupplier, setOnCreateSupplier] = useState<boolean>();
  const [onDeleteSupplier, setOnDeleteSupplier] = useState<boolean>();
  const [onEditSupplier, setOnEditSupplier] = useState<boolean>();

  return (
    <AppContext.Provider
      value={{
        setOnCreateSupplier,
        onCreateSupplier,
        setOnDeleteSupplier,
        onDeleteSupplier,
        onEditSupplier,
        setOnEditSupplier,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
