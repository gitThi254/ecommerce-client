import axios from "./axios";

export const loginReq = (data: Login) =>
  axios.post("users/login", data).then((res) => res.data.data);

export const forgotPasswordReq = async (data: EmailType) =>
  axios.post("users/forgot-passwork-token", data).then((res) => res.data);

export const resetPasswordReq = async ({
  token,
  password,
}: {
  token?: string;
  password?: string;
}) =>
  axios
    .patch(`users/resetPassword/${token}`, { password: password })
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const verifyReq = async () =>
  axios.get("/users/verify").then((res) => {
    return res.data;
  });

export const updateOfUser = async (data: MyProfile) =>
  await axios.put(`users/edit-user`, data).then((res) => res.data.data);

export const registerReq = async (data: Register) =>
  axios.post("/users/register", data).then((res) => res.data.data);

export const logoutReq = async () =>
  axios.post("/users/logout").then((res) => {
    return res.data;
  });

export const wishlistReq = async () =>
  axios.get("/users/wishlist").then((res) => {
    return res.data.data.wishlist;
  });

export const addTocartReq = async (cart: any): Promise<Cart> =>
  axios
    .post("users/cart", cart)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

export const getCartsReq = async () =>
  axios
    .get("users/cart")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));

export const deleteCartReq = async (id?: string) =>
  axios.delete(`users/delete-product-cart/${id}`).then((res) => res.data.data);

export const emptyCartReq = async () =>
  axios
    .delete(`/users/empty-cart`)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

export const updateQuantityFromCartReq = async ({
  id,
  newQuantity,
}: {
  id: string;
  newQuantity: number;
}) =>
  axios
    .put(`users/update-product-cart/${id}/${newQuantity}`)
    .then((res) => res.data.data);

export const createOrderReq = async (data: any) => {
  return axios
    .post("users/cart/create-order", data)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getOdersReq = async () => {
  return axios
    .get("/users/getmyorders")
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};
