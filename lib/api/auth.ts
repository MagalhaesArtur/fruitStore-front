import { AxiosResponse } from "axios";
import api from "./api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export const Auth = async (token: string) => {
  if (token != null) {
    try {
      const response = await api.post("/auth/validateToken", {
        token: token,
      });
      return response;
    } catch (e) {
      toast.error("Erro no login, tente novamente");
      localStorage.clear();
    }
  } else {
    localStorage.clear();
  }
};

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  let response = {};
  try {
    response = await api.post("/auth/login", { username, password });

    return response;
  } catch (e) {
    let x = e as Error;
    return x.message;
  }
};
