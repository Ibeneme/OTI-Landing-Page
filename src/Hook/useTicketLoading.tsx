import React, { ReactNode, createContext, useContext, useState } from 'react';

interface LoadingContextType {
  SRMTicketsLoading: boolean;
  setSRMTicketsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [SRMTicketsLoading, setSRMTicketsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ SRMTicketsLoading, setSRMTicketsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};


export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
