import api from "@/lib/api/api";
import { useState } from "react";

const useLogin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (login: string, password: string) => {
    setLoading(true);
    try {
      const token1 = await api.post("/auth/login", { login, password });

      localStorage.setItem("@Auth:token", token1.data.token);
      setToken(token1.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token1.data.token}`;
      return true;
    } catch (error) {
      setError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { token, error, loading, handleLogin, setLoading };
};

export default useLogin;
