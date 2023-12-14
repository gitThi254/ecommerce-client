import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordType>({
    defaultValues: {
      password: "",
    },
  });
  const { mutate: resetPasswordMutation, isPending } = useResetPassword();
  const onSubmit = (data: PasswordType) => {
    resetPasswordMutation({ token, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='password'
        placeholder='Enter new Password'
        {...register("password")}
      />
      <button disabled={isPending}>
        {isPending ? "Loading..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
