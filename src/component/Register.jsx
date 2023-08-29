import Container from "react-bootstrap/Container";
import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../redux/action/index";

import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { base_url } from "../utils/environment";

export default function Register() {
  let nav = useNavigate();

  let { name, id } = useSelector((s) => s.auth);

  let dispatch = useDispatch();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);

  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    console.log(name, id);
  }, [name, id]);

  const [err, setErr] = useState({
    email: null,
    password1: null,
    password2: null,
  });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const changeHandler = (e) => {
    if (e.target.name === "email" && !emailRegex.test(e.target.value)) {
      setErr({
        ...err,
        [e.target.name]: ` Please Enter a Valid Email !`,
      });
    } else if (e.target.name === "password" && e.target.value.length <= 8) {
      setErr({
        ...err,
        [e.target.name]: ` Password must contains at least 8 characters !`,
      });
    } else if (
      e.target.name === "confirmPassword" &&
      e.target.value !== formData.password
    ) {
      setErr({
        ...err,
        [e.target.name]: ` Password Dosen't Matched !`,
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
      !err.password1 &&
      !err.password2 &&
      emailRegex.test(formData.email) &&
      formData.confirmPassword === formData.password &&
      formData.password.length >= 8
    ) {
      try {
        let url = `${base_url}register`;
        let response = await axios.post(url, {
          ...formData,
          password_confirmation: formData.confirmPassword,
        });
        console.log(response, response.data);
        let { user, token } = response.data;
        dispatch(login({ id: user.id, name: user.name }));
        localStorage.setItem(`user`, JSON.stringify(user));
        localStorage.setItem(`token`, token);
        Swal.fire({
          position: "center-center",
          type: "success",
          icon: "success",
          title: "Your Links has been saved ✔👌",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          nav(`/`);
        }, 2500);
      } catch (err) {
        console.log(err);
      }

    } else {
      Swal.fire({
        type: "error",
        title: "Something went wrong!",
        icon: "error",
        text: `You can't submit this form before enter valid data 
            and two passwords matched. Please try again
             `,
      });
    }
  };
  return (
    <Container className="col-md-6 my-5 shadow p-4 rounded-4 ">
      <h5 className="text-center fa-2x mb-4">Create An Account</h5>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="form.Email">
          <Form.Control
            type="text"
            onChange={changeHandler}
            value={formData.name}
            name="name"
            placeholder="Name"
          />
        </Form.Group>

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

        <Form.Group
          className="my-3"
          ref={pass1Ref}
          controlId="formBasicPassword"
        >
          <Form.Control
            type="password"
            onChange={changeHandler}
            value={formData.password}
            name="password"
            placeholder="Password "
          />
          <Form.Text>{err.password1}</Form.Text>
        </Form.Group>

        <Form.Group
          className="my-3"
          ref={pass2Ref}
          controlId="formBasicPassword"
        >
          <Form.Control
            type="password"
            onChange={changeHandler}
            value={formData.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password "
          />
          <Form.Text>{err.password2}</Form.Text>
        </Form.Group>

        <button className="btn btn-dark "> Submit </button>

        <p className="text-center my-3">
          Already Have An Account?
          <Link to="/login" className="ms-1 ">
            SignIn
          </Link>
        </p>
        <p className="text-center fw-bold">SignUp With </p>
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
