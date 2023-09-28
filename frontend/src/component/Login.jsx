import Container from "react-bootstrap/Container";
import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../redux/action/index";
import axios from "axios";

import { MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { base_url, base_url_admin } from "../utils/environment";

export default function Register() {
  let nav = useNavigate();
  let { name, id } = useSelector((s) => s.auth);
  let dispatch = useDispatch();

  const initialFormData = {
    email: "",
    password: "",
  };

  const passRef = useRef(null);

  const [formData, setFormData] = useState({ ...initialFormData });

  const [err, setErr] = useState({
    email: null,
    password: null,
  });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const changeHandler = (e) => {
    if (e.target.name === "email" && !emailRegex.test(e.target.value)) {
      setErr({
        ...err,
        [e.target.name]: ` Please Enter a Valid Email !`,
      });
    } else if (e.target.name === "password" && e.target.value.length <= 6) {
      setErr({
        ...err,
        [e.target.name]: ` Password must contains at least 8 characters !`,
      });
    } else {
      setErr({
        ...err,
        [e.target.name]: null,
      });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !err.email &&
      !err.password &&
      emailRegex.test(formData.email) &&
      formData.password.length > 7
    ) {
      try {
        // console.log(formData);
        let url;
        if (formData.email == `a@a.com`) {
          url = `${base_url_admin}login`;
        } else {
          url = `${base_url}login`;
        }
        let response = await axios.post(url, formData);
        // console.log(response, response.data);
        let { user, token } = response.data;
        dispatch(login({ id: user.id, name: user.name, email: user.email }));
        localStorage.setItem(`user`, JSON.stringify(user));
        localStorage.setItem(`token`, token);

        setTimeout(() => {
          nav(`/`);
        }, 2500);

        Swal.fire({
          position: "center-center",
          type: "success",
          title: "Enjoy in our store ✔👌",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          type: "error",
          title: "Something went wrong!",
          icon: "error",
          text: err?.response?.data?.message || err?.message,
        });
      }
    } else {
      Swal.fire({
        type: "error",
        title: "Something went wrong!",
        icon: "error",
        text: `You can't submit this form before enter valid data  `,
      });
    }
  };
  return (
    <Container className=" my-5 col-md-6 shadow p-4 rounded-4 ">
      <h5 className="text-center fa-2x mb-4">Login</h5>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="form.Email">
          <Form.Control
            type="email"
            onChange={changeHandler}
            value={formData.email}
            name="email"
            placeholder="name@example.com"
          />
          <Form.Text>{err.email}</Form.Text>
        </Form.Group>

        <Form.Group className="my-3" ref={passRef} controlId="formBasicPassword">
          <Form.Control
            type="password"
            onChange={changeHandler}
            value={formData.password}
            name="password"
            placeholder="Password "
          />
          <Form.Text>{err.password}</Form.Text>
        </Form.Group>

        <div className="button">
          <button className="btn btn-dark"> Login</button>
        </div>

        <p className="text-center mt-3 mb-2">
          Don't Have An Account?
          <Link to="/register" className="ms-1 ">
            SignUp
          </Link>
        </p>
        <p className="text-center ">Or </p>
        <MDBContainer className=" pb-0 text-center ">
          <section className="mb-4">
            <MDBBtn
              floating
              className="me-4 border-0 rounded shadow"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/marawan.magdy.58910"
              role="button"
              target="_blank"
            >
              <MDBIcon fa icon="facebook-f" />
            </MDBBtn>

            <MDBBtn
              floating
              className="me-4 border-0 rounded shadow"
              style={{ backgroundColor: "#dd4b39" }}
              href="http://marawanmagdy389@gmail.com"
              role="button"
              target="_blank"
            >
              <MDBIcon fa icon="google" />
            </MDBBtn>

            <MDBBtn
              floating
              className="me-4 border-0 rounded shadow"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/in/marwan-magdy72"
              role="button"
              target="_blank"
            >
              <MDBIcon fa icon="linkedin" />
            </MDBBtn>

            <MDBBtn
              floating
              className="me-4 border-0 rounded shadow"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/MarwanMagdy72"
              role="button"
              target="_blank"
            >
              <MDBIcon fa icon="github" />
            </MDBBtn>
          </section>
        </MDBContainer>
      </Form>
    </Container>
  );
}
