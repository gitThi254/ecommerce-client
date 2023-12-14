import { Link } from "react-router-dom";
import {
  useCarts,
  useLogout,
  useVerify,
  useWishlist,
} from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Menu = () => {
  const { data: users } = useVerify();
  const [totalsum, setTotalSum] = useState<number>(0);
  const { mutate: logoutMutation, isPending } = useLogout();
  const { data: wishlist, isPending: pending } = useWishlist();
  const { data: carts, isPending: pendCart } = useCarts();

  useEffect(() => {
    let sum = 0;
    const sumWithInitial = carts?.reduce(
      (acc: number, curr: any) => acc + curr.price,
      sum
    );
    setTotalSum(sumWithInitial);
  }, [carts]);

  return (
    <div className='flex justify-between p-4 container mx-auto'>
      <div>
        <Link to='/'>Logo</Link>
      </div>
      <div>
        <Link to='/product'>Product</Link>
      </div>
      <div className='flex gap-10 items-center'>
        {users ? (
          <>
            <Link to=''>{users.firstname + " " + users.lastname}</Link>
            <Link to='/wishlist'>
              wishlist {wishlist && !pending ? wishlist.length : 0}
            </Link>
            <Link to='/cart'>
              Cart {carts && !pendCart ? carts.length : 0} - ${" "}
              {totalsum && !pendCart ? totalsum : 0}
            </Link>
            <Link to='/blog'>Blog</Link>
            <Link to='/order'>Order</Link>
            <Link to='/my-profile'>Profile</Link>

            <button
              onClick={() => logoutMutation()}
              className='text-lg cursor-pointer'
            >
              {isPending ? "Loading..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
