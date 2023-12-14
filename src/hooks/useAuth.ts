import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  addTocartReq,
  createOrderReq,
  deleteCartReq,
  emptyCartReq,
  forgotPasswordReq,
  getCartsReq,
  getOdersReq,
  loginReq,
  logoutReq,
  registerReq,
  resetPasswordReq,
  updateOfUser,
  updateQuantityFromCartReq,
  verifyReq,
  wishlistReq,
} from "../api/auth.api";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginReq,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      }
      queryClient.setQueryData(["auth"], data);
      queryClient.setQueryData(["wishlist"], data.wishlist);
      queryClient.setQueryData(["cart"], data.cart);

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      navigate("/");
    },
    onError(error: any) {
      error.message = error.response?.data;
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: logoutReq,
    onSuccess: () => {
      localStorage.removeItem("auth");
      queryclient.removeQueries({ queryKey: ["auth"], exact: true });
      queryclient.invalidateQueries({ queryKey: ["auth"] });
      queryclient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerify = () => {
  const queryClient = useQueryClient();
  const authDefault = JSON.parse(localStorage.getItem("auth")) ?? null;
  const user = useQuery({
    queryKey: ["auth"],
    queryFn: verifyReq,
    refetchIntervalInBackground: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    initialData: authDefault,
  });
  if (user.error && !user.isLoading) {
    queryClient.setQueryData(["auth"], null);
    queryClient.setQueryData(["wishlist"], null);
    localStorage.removeItem("auth");
  }
  if (user.data) {
    localStorage.setItem("auth", JSON.stringify(user.data));
  }

  return user ?? null;
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerReq,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useWishlist = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistReq,
    initialData: () => queryClient.getQueryData<any>(["auth"])?.wishlist,
  });
};

export const useUpdateOfUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOfUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
  });
};

export const useAddtoCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTocartReq,
    onSuccess: (data) => {
      queryClient.setQueryData<any>(["cart"], (old: any) => {
        old.push(data);
        return old;
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useCarts = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartsReq,
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartReq,
    onSuccess: (data) => {
      queryClient.setQueryData<any>(["cart"], (old: any) =>
        old?.filter((cart: any) => cart._id !== data._id)
      );
    },
  });
};

export const useEmptyCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emptyCartReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], null);
    },
  });
};

export const useUpdateQuantityFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuantityFromCartReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOdersReq,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordReq,
    onSuccess: (data) => {
      alert(data.message);
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPasswordReq,
    onSuccess: (data) => {
      alert(data.message);
      navigate("/login");
    },
  });
};
