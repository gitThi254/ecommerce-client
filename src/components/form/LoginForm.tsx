import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/formSchema";
import { useLogin } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const { mutate: loginMutation, isPending, error } = useLogin();
  const onSubmit = (data: Login) => {
    loginMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <div>
        <input type='text' placeholder='Email' {...register("email")} />
        <div>{errors?.email?.message}</div>
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        <div>{errors?.password?.message}</div>
      </div>
      <div className='flex gap-10'>
        {" "}
        <Link to='/forgot-password'>Forgot password</Link>
        <button disabled={isPending}>
          {isPending ? "Loading..." : "Login"}{" "}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
