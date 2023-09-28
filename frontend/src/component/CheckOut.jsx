import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import authenticatedRequest from "../utils/authenticatedRequest";
import { base_url } from "../utils/environment";
import Cities from "./Cities";
import Countries from "./Countries";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import { delItem, setCart } from "../redux/action/index";
import Swal from "sweetalert2";

const Checkout = () => {
  let nav = useNavigate();
  let dispatch = useDispatch();
  const state = useSelector((state) => state.addItem);
  const cart = useSelector((state) => state.cart);
  let [totalPrice, setTotalPrice] = useState();

  let [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    line1: "",
    line2: "",
    city: "",
    country: "",
    zipcode: "",
    province: `N/A`,
  });

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, curr) => acc + (curr?.price || 0), 0));
    console.log(cart.reduce((acc, curr) => acc + (curr?.price || 0), 0));
  }, [cart]);
  // const cart = useSelector((state) => state.cart);

  var total = 0;
  const itemList = (cartItem) => {
    total = total + cartItem.price;
    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">{cartItem.title}</h6>
        </div>
        <span className="text-muted">${cartItem.price}</span>
      </li>
    );
  };

  let handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    console.log(formData);
  };
  let submitHandler = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(formData));
    console.log(formData);

    let token = localStorage.getItem(`token`);
    try {
      let response = await axios.post(`${base_url}orders`, formData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON,
          Authorization: `Bearer ${token}`,
        },
      });

      // .catch((e) => console.log(e));
      let { data } = response;
      let cart = await authenticatedRequest({
        method: `GET`,
        url: `${base_url}cart`,
        token,
      });
      console.log(data, cart);
      dispatch(setCart(cart));

      Swal.fire({
        position: "center-center",
        type: "success",
        icon: "success",
        title: "Your order has been created ✔👌",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        nav(`/orders`);
      }, 2000);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container my-5"
      style={{minHeight:`90vh`}}
      >
        <div className="row ">
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={submitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Your first name"
                    required
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Your last name"
                    required
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="phonenumber" className="form-label">
                    Phone number
                  </label>
                  <div className="input-group has-validation">
                    {/* <span className="input-group-text">@</span> */}
                    <input
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      // id="phonenumber"
                      placeholder="Phone number"
                      required
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      required=""
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                {/* <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div> */}

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    name="line1"
                    value={formData.line1}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                    required
                    name="line2"
                    value={formData.line2}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Countries name="country" onChange={handleChange} />
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Cities name="city" onChange={handleChange} />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                    name="zipcode"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information htmlFor next time
                </label>
              </div>

              <hr className="my-4" />

              {/* <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked=""
                    required=""
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div> */}

              <div className="col-md-6 col-lg-6 order-md-last my-5 shadow h-25  p-3 rounded-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-primary">Your cart</span>
                  <span className="badge bg-primary rounded-pill">
                    {state?.length}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${totalPrice}</strong>
                  </li>
                </ul>

                {/* <form className="card  ">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                    />
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
                </form> */}
              </div>

              {/* <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div> */}

              <hr className="my-4" />

              <button
                className="w-50 btn btn-outline-dark btn-lg me-2"
                type="submit"
              >
                Checkout
              </button>
              {/* <NavLink
                className="w-50 btn btn-outline-dark btn-lg me-2"
                type="submit"
                to="/order-status"
              >
                Checkout
              </NavLink> */}
              <NavLink className="w-25 btn btn-dark btn-lg" to="/Cart">
                Back
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
