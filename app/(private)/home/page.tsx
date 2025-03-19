"use client";
import Input from "@/app/components/Input";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/context/auth";
import useSale from "@/hooks/useSale";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { handleSendSale } = useSale();
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      buyerId: "",
      sellerId: "",
      items: [
        {
          fruitId: "",
          quantity: 1,
          discountPercentage: 0,
          subtotal: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    const { buyerId, items } = values;

    const data: any = await handleSendSale(buyerId, user?.id || "", items);
    if (data.status == 200) {
      reset();
    }

    //
  };
  return (
    <div className=" min-w-screen flex items-center justify-center bg-gradient-to-r ">
      <div className="md:flex ">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="buyerId"
              className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} `}
              type="text"
              autoComplete="on"
              {...register("buyerId", { required: true })}
              placeholder="Digite o id do comprador..."
            />
          </div>
          {fields.map((item, index) => (
            <div>
              <div>
                <Input
                  id="fruitId"
                  className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} `}
                  type="text"
                  autoComplete="on"
                  {...register(`items.${index}.fruitId`)}
                  placeholder="Digite o id da fruta..."
                />
                <Input
                  id="quantity"
                  className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} `}
                  type="number"
                  autoComplete="on"
                  {...register(`items.${index}.quantity`)}
                  placeholder="Digite a quantidade..."
                />
                <Input
                  id="discountPercentage"
                  className={`transition-all  ${"bg-white text-black  hover:shadow-customDark border-indigo-600"} `}
                  type="number"
                  autoComplete="on"
                  {...register(`items.${index}.discountPercentage`)}
                  placeholder="Digite a porcentagem de desconto..."
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                fruitId: "",
                quantity: 1,
                discountPercentage: 0,
                subtotal: 0,
              })
            }
            className="bg-blue-500 text-white p-2 rounded"
          >
            Adicionar Item
          </button>
          <Button
            type="submit"
            className="
              outline-0
              transition-all hover:shadow-customDark w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-purple-500"
          >
            Enviar venda
          </Button>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
