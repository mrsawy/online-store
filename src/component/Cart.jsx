import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { delItem } from "../redux/action/index";

function Cart() {
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  const cartItems = (cartItem) => {
    return (
      
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
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
            <div className="col-md-4">
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
          <NavLink to="/checkout" className="btn btn-outline-dark mb-5  ">
            Proceed To checkout
          </NavLink>

        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && button()}
    </>
  );
}

export default Cart;
