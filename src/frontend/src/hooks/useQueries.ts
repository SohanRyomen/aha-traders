import { useMutation } from "@tanstack/react-query";
import type { Product } from "../backend";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
      productInterest: Product;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        data.name,
        data.email,
        data.phone,
        data.message,
        data.productInterest,
      );
    },
  });
}
