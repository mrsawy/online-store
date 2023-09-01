import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { delItem, setCart } from "../redux/action/index";
import authenticatedRequest from "../utils/authenticatedRequest";
import { base_url } from "../utils/environment";
import Swal from "sweetalert2";

function Cart() {
  let nav = useNavigate();
  const state = useSelector((state) => state.addItem);
  const cart = useSelector((state) => state.cart);
  const { isLogged } = useSelector((state) => state.auth);
  let [cartState, setCartState] = useState([]);
  useEffect(() => {
    if (isLogged) {
      setCartState(cart);
    } else {
      setCartState(state);
    }
  }, [cart, isLogged, setCartState, state]);

  useEffect(() => {
    console.log(`cartState is ==`, cartState);
  }, [cartState]);

  const dispatch = useDispatch();

  const handleClose = async (item) => {
    !isLogged && dispatch(delItem(item));
    if (isLogged) {
      let token = localStorage.getItem(`token`);
      let data = await authenticatedRequest({
        method: `DELETE`,
        url: `${base_url}cart/${item.id}`,
        token,
      });

      let cart = await authenticatedRequest({
        method: `GET`,
        url: `${base_url}cart`,
        token,
      });
      console.log(data, cart);
      dispatch(setCart(cart));
      // console.log(data)
    }
  };

  const cartItems = (cartItem) => {
    return (
      <div
        className="px-4  bg-light rounded-3"
        key={cartItem.id}
        style={{
          maxWidth: 800,
          margin: `20px auto`,
          // minHeight: `90vh`,
          border: `2px solid #e1e1e1`,
        }}
      >
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-5 me-5">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="100%"
              />
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">Price: {cartItem.price}$</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4 ">
          <div className="row text-center">
            <h3>Your Cart is Empty !</h3>
            <NavLink to="/products">
              <button className="btn btn-success my-3 fw-bold">Shop Now</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
    return (
      <div className="container">
        <div className=" text-center">
          <NavLink to="/products" className="btn btn-dark mb-2  fw-bold  ">
            Add Items <i class="fa fa-plus ms-1"></i>
          </NavLink>
          <br />
          <div
            className="btn btn-outline-dark mb-5"
            onClick={() => {
              if (isLogged) {
                nav(`/checkout`);
              } else {
                Swal.fire({
                  type: "error",
                  title: "Something went wrong!",
                  icon: "error",
                  text: `You need to login first to proceed to checkout`,
                });
              }
            }}
          >
            Proceed To checkout
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {cartState.length === 0 && emptyCart()}
      {cartState.length !== 0 && cartState.map(cartItems)}
      {cartState.length !== 0 && button()}
    </>
  );
}

export default Cart;
