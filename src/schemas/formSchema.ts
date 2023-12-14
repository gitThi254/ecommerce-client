import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  mobile: Yup.string()
    .required("Mobilee is required")
    .length(10, "Mobile must have 10 character"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const addtocartSchema = Yup.object({
  productId: Yup.string(),
  color: Yup.string().required("Color is required"),
  quantity: Yup.number().required("Quantity is required"),
});

export const userSchema = Yup.object({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string().required("Email is required").email("Invalid is Email"),
  mobile: Yup.string()
    .required("Mobile is required")
    .length(10, "Mobile must have 10 characters"),
});

export const emailShema = Yup.object({
  email: Yup.string().required("Email is required").email("Email is inValid"),
});

export const passwordShema = Yup.object({
  password: Yup.string().required("Password is required"),
});

export const ratingSchema = Yup.object({
  star: Yup.string().required("rating is required"),
  comment: Yup.string().required("comment is required"),
});
