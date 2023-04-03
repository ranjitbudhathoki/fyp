import { createContext, useState, useContext } from 'react';

interface Admin {
  id: string;
  username: string;
}

interface AdminContext {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  isSystemAdminLoggedIn: () => boolean;
}

const AdminContext = createContext<AdminContext | null>(null);

function AdminContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  function isSystemAdminLoggedIn() {
    return Boolean(admin);
  }

  const value = { admin, setAdmin, isSystemAdminLoggedIn };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

function useSystemAdmin() {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error(
      'useSystemAdmin can only be used within <AdminContextProvider/>'
    );
  return context;
}

export { useSystemAdmin };
export default AdminContextProvider;
