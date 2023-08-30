import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCart } from "../redux/action";
import { useParams } from "react-router";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { base_url } from "../utils/environment";
import authenticatedRequest from "../utils/authenticatedRequest";
const Product = () => {
  let { isLogged } = useSelector((s) => s.auth);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`${base_url}products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };
    getProduct();
    window.scroll(0,0)
  }, []);

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 mb-5" style={{ minHeight: `190vh` }}>
          <img
            src={product.image}
            alt={product.title}
            // height={"460px"}
            width={"100%"}
          />
        </div>
        <div className="col-md-6"
        // style={{ minHeight: `100vh` }}
        >
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder w-50 text-center p-2 rounded-4 shadow">
            {" "}
            Rating: {product.rating && product.rating.rate}
            <i className="fa fa-star ms-1 text-warning"></i>
          </p>
          <h3 className="display-6 fw-bold my-5">Price: {product.price}$</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2 "
            onClick={async () => {
              if (isLogged) {
                let token = localStorage.getItem(`token`);
                let data = await authenticatedRequest({
                  method: `POST`,
                  url: `${base_url}cart/${product.id}`,
                  token,
                });
                let cart = await authenticatedRequest({
                  method: `GET`,
                  url: `${base_url}cart`,
                  token,
                });
                console.log(data, cart);
                dispatch(setCart(cart));
              } else {
                addProduct(product);
              }

              Swal.fire({
                position: "center-center",
                type: "success",
                icon: "success",
                title: "Item Added ✔",
                showConfirmButton: false,
                timer: 2000,
              });
            }}
          >
            Add to cart
          </button>
          <NavLink to="/cart" className=" btn btn-dark px-3 py-2 ms-2">
            Go to cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container py-5"
      style={{ minHeight: `100vh` }}
      >
        <div className="row py-5">
          {" "}
          {loading ? <Loading /> : <ShowProduct />}{" "}
        </div>
      </div>
    </>
  );
};

export default Product;
