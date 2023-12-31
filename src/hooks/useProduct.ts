import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRatingReq,
  addWishlistReq,
  getProduct,
  getProducts,
} from "../api/product.api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    initialData: () =>
      queryClient
        .getQueryData<any>(["products"])
        ?.find((product: any) => product._id === id),
  });
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWishlistReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRatingReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", data._id], data);
    },
  });
};
