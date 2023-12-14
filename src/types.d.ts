type Login = {
  email: string;
  password: string;
};

type MyProfile = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
};

type Register = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
};

type Product = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  brand: any;
  price: number;
  quantity: number;
  category: any;
  color: any;
  images: any;
};

type Cart = {
  productId?: string;
  quantity: number;
  color: string;
};

type ListCart = {
  cart: Cart[];
};

type ShippingAddressType = {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  firstname: string;
  lastname: string;
  other: string;
  pincode: string;
};

type EmailType = {
  email: string;
};

type PasswordType = {
  password: string;
};

type RatingType = {
  star: string;
  comment: string;
};
