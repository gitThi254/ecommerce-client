import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { emailShema } from "../../schemas/formSchema";
import { useForgotPassword } from "../../hooks/useAuth";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(emailShema),
  });
  const { mutate: forgotPasswordMutation, isPending } = useForgotPassword();

  const onSubmit = (data: EmailType) => {
    forgotPasswordMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='Email'
          placeholder='Enter a Email'
          {...register("email")}
        />
        <div>{errors?.email?.message}</div>
      </div>
      <button disabled={isPending}>
        {isPending ? "Loading..." : "Forgot Password"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
