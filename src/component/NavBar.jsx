import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setOrders } from "../redux/action";
import authenticatedRequest from "../utils/authenticatedRequest";
import { base_url } from "../utils/environment";

const NavBar = () => {
  let dispatch = useDispatch();
  let nav = useNavigate();

  const state = useSelector((state) => state.addItem);
  const { orders } = useSelector((state) => state.orders);
  let [ordersState, setOrdersState] = useState();
  useEffect(() => {
    (async () => {
      let token = localStorage.getItem(`token`);
      let orders = await authenticatedRequest({
        method: `GET`,
        url: `${base_url}orders`,
        token,
      });
      setOrdersState(orders);
      dispatch(setOrders(orders));
    })();
  }, []);
  const cart = useSelector((state) => state.cart);
  const { isLogged, id, name } = useSelector((state) => state.auth);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light col-12 bg-light py-3 shadow">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fa-2x" to="/">
            STOP & SHOP
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active fw-bold " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link " to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link " to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link " to="/contact">
                  Contact
                </NavLink>
              </li>

              {isLogged && (orders?.length > 0 || ordersState?.length > 0) && (
                <li className="nav-item fw-bold">
                  <NavLink className="nav-link " to="/orders">
                    Orders
                  </NavLink>
                </li>
              )}

              {isLogged && name == `admin` && id == 1 && (
                <>
                  <li className="nav-item fw-bold">
                    <NavLink className="nav-link " to="/admin-create-product">
                      Create Product
                    </NavLink>
                  </li>

                  <li className="nav-item fw-bold">
                    <NavLink className="nav-link " to="/admin-view-products">
                      View Products
                    </NavLink>
                  </li>
                    <li className="nav-item fw-bold">
                      <NavLink className="nav-link " to="/admin-view-orders">
                        View all orders
                      </NavLink>
                    </li>
                </>
              )}
            </ul>
            <div className="buttons">
              {!isLogged && (
                <>
                  <NavLink className="btn btn-outline-dark me-2" to="/login">
                    <i className="fa fa-sign-in me-1"></i> Login
                  </NavLink>
                  <NavLink className="btn btn-outline-dark me-2 " to="/register">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                </>
              )}

              {isLogged && (
                <>
                  <div
                    className="btn btn-outline-dark me-2"
                    onClick={() => {
                      dispatch(logout());
                      nav(`/`);
                    }}
                  >
                    <i className="fa fa-sign-out me-1"></i> Logout
                  </div>
                </>
              )}
              <NavLink className="btn border-0  " to="/cart">
                <span
                  className="badge bg-danger rounded-pill d-block "
                  style={{ fontSize: 18, marginBottom: -6 }}
                >
                  {!isLogged ? state?.length : cart?.length}
                </span>
                <i className="fa fa-shopping-cart me-1  fa-2x "></i>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
