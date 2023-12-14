import axios from "./axios";
export const getProducts = (): Promise<Product[]> =>
  axios.get("/products").then((res) => res.data.data);

export const addWishlistReq = (id?: string) =>
  axios
    .put(`products/wishlist`, { productId: id })
    .then((res) => res.data.data);

export const getProduct = (id?: string): Promise<Product> => {
  return axios.get(`/products/${id}`).then((res) => res.data.data);
};

export const addRatingReq = async (data: any) => {
  return await axios.put("products/rating", data).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
