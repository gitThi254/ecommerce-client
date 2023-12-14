import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { ratingSchema } from "../../schemas/formSchema";
import { useParams } from "react-router-dom";
import { useAddComment } from "../../hooks/useProduct";

const RatingForm = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RatingType>({
    defaultValues: {
      star: "",
      comment: "",
    },
    resolver: yupResolver(ratingSchema),
  });
  const { mutate: addCommentMutation, isPending } = useAddComment();
  const onSubmit = (data: RatingType) => {
    addCommentMutation({ ...data, productId: id });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {" "}
        <input type='radio' value='1' {...register("star")} /> : 1
        <input type='radio' value='2' {...register("star")} /> : 2
        <input type='radio' value='3' {...register("star")} /> : 3
        <input type='radio' value='4' {...register("star")} /> : 4
        <input type='radio' value='5' {...register("star")} /> : 5
        <div>{errors?.star?.message}</div>
      </div>
      <div>
        <textarea
          rows={5}
          placeholder='Enter a comment'
          {...register("comment")}
        />
        <div>{errors?.comment?.message}</div>
      </div>
      <button disabled={isPending}>
        {isPending ? "Loading..." : "add comment"}
      </button>
    </form>
  );
};

export default RatingForm;
