import React from "react";
import { useAddWishlist, useProduct } from "../hooks/useProduct";
import { Link, useParams } from "react-router-dom";
import AddtoCart from "../components/form/AddtoCart";
import RatingForm from "../components/form/RatingForm";

const ProductInfo = () => {
  const { id } = useParams();
  const { data: product, isPending, error } = useProduct(id);
  const { mutate: addTodListMutation, isPending: penAddtoList } =
    useAddWishlist();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <div>
          <Link to={`/product`}>go to product</Link>
        </div>
        <div>
          <div>{product?.title}</div>
          <div>{product?.description}</div>
          <div className='w-[200px] h-[200px] border-1 border border-slate-800'>
            {product?.images?.map((image: any) => (
              <div key={image._id}>
                <img
                  src={image.url}
                  alt='product'
                  className='object-contain w-full h-full'
                />
              </div>
            ))}
          </div>
          <div>{product?.slug}</div>
          <div>{product?.brand?.title}</div>
          <div>{product?.price}</div>
          <AddtoCart color={product?.color} id={product._id} />
          <button>buy now</button>
        </div>
        <button
          onClick={() => addTodListMutation(product._id)}
          disabled={penAddtoList}
        >
          {penAddtoList ? "Loading..." : "Add to wishlist"}
        </button>
        <div className='mt-16'>
          <div>All comment :</div>
          {product?.ratings?.map((rating: any) => (
            <div key={rating._id} className='flex gap-10'>
              <div>{rating.comment}</div>
              <div>{rating.star}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <RatingForm />
      </div>
    </div>
  );
};

export default ProductInfo;
