import { createContext, useContext, useMemo } from "react";
import { Api } from "../types/service"; 
import apiClient  from '../api.service/client'

const ApiContext = createContext<Api | null>(null);

export const useApi = (): Api => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("Failed to create context");
  }
  return context;
};

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const api = useMemo(() => apiClient.create(), []); 

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
