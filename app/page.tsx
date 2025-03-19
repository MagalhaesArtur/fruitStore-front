"use client";
import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import useLogin from "@/hooks/useLogin";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Button } from "./components/ui/button";
import { HashLoader } from "react-spinners";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const router = useRouter();
  const { loading, handleLogin } = useLogin();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    const { login, password } = values;

    const isLoginSucess = await handleLogin(login, password);

    setTimeout(() => {
      if (isLoginSucess) {
        setIsAuthenticated(true);
        setIsLoading(false);
        toast.success("Login efetuado com sucesso!");
        router.replace("/home");
        reset();
        setIsLoading(false);
      } else {
        toast.error("Senha ou usuário/email incorretos");
        setIsLoading(false);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    }, 1000);
  };

  if (isAuthenticated) {
    return null;
  } else {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r ">
        <div className="w-[350px] md:w-[700px]  lg:w-[900px]  bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="md:flex ">
            <div className="w-full flex justify-center items-center p-4 py-6 sm:p-6 md:p-8 bg-gradient-to-r from-[#1b1919]  to-indigo-600 text-white">
              <h2 className="text-3xl font-bold text-center mb-4">
                Bem Vindo!
              </h2>
            </div>
            <div className="w-full p-4 py-6 sm:p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Login
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Bem Vindo! Entre na sua conta.
              </p>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div></div>
                <div>
                  <Input
                    id="login"
                    className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} ${
                      isError ? "border-red-600" : ""
                    }`}
                    disabled={loading}
                    type="text"
                    autoComplete="on"
                    {...register("login", { required: true })}
                    placeholder="Digite o seu login..."
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} ${
                      isError ? "border-red-600" : ""
                    }`}
                    disabled={loading}
                    type="password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    placeholder="Digite a sua senha..."
                  />
                </div>
                <div className="flex items-center justify-between"></div>
                <div>
                  <Button
                    type="submit"
                    className="
                    outline-0
                    transition-all hover:shadow-customDark w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-purple-500"
                  >
                    {loading || isLoading ? (
                      <HashLoader size={25} color="#36d7b7" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
              <p className="mt-2 text-center text-sm text-gray-600">
                Novo usuário?{" "}
                <a
                  onClick={() => {
                    router.replace("/register");
                  }}
                  className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                >
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
