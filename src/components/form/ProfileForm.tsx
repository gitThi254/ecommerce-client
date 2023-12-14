import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../../schemas/formSchema";
import { useUpdateOfUser } from "../../hooks/useAuth";

const ProfileForm = ({ user }: { user: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyProfile>({
    defaultValues: user,
    resolver: yupResolver(userSchema),
  });
  const { mutate: myProfileMutation, isPending } = useUpdateOfUser();
  const onSubmit = (data: MyProfile) => {
    myProfileMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type='text' placeholder='Firstname' {...register("firstname")} />
        <div>{errors?.firstname?.message}</div>
      </div>
      <div>
        <input type='text' placeholder='Firstname' {...register("lastname")} />
        <div>{errors?.lastname?.message}</div>
      </div>
      <div>
        <input type='email' placeholder='Firstname' {...register("email")} />
        <div>{errors?.email?.message}</div>
      </div>
      <div>
        <input type='text' placeholder='Firstname' {...register("mobile")} />
        <div>{errors?.mobile?.message}</div>
      </div>

      <button disabled={isPending}>
        {isPending ? "Loading..." : "update profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
