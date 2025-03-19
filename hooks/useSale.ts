import api from "@/lib/api/api";
import { useState } from "react";

const useSale = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendSale = async (
    buyerId: string,
    sellerId: string,
    items: Array<any>
  ) => {
    setLoading(true);
    const token = localStorage.getItem("@Auth:token");

    try {
      const data = await api.post(
        "/sales",
        { buyerId, sellerId, items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      setError(error as Error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSendSale, setLoading };
};

export default useSale;
