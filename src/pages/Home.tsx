import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useProducts } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: products, isPending, error } = useProducts();
  const [paginate, setPaginate] = useState(true);
  const navigate = useNavigate();
  let productOpt: any = products?.map((product, i) => {
    return {
      id: i,
      prod: product._id,
      name: product.title,
    };
  });

  return (
    <div>
      <Typeahead
        id='pagination-example'
        onPaginate={() => console.log("Results paginated")}
        onChange={(e: any) => {
          navigate(`/product/${e[0].prod}`);
        }}
        options={productOpt}
        minLength={2}
        paginate={paginate}
        labelKey={"name"}
        placeholder='Search for Products here...'
      />
    </div>
  );
};

export default Home;
