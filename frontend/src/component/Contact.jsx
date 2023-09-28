import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBTextArea,
  MDBBtn,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import Loading from "./Loading";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const ShowContact = () => {
    return (
      <div className="container my-5 shadow col-lg-8 p-3 rounded-4">
        <form id="form" className="text-center mx-auto  ">
          <h2 className="mb-3">Contact us</h2>

          <MDBInput v-model="name" placeholder="Name" wrapperClass="mb-4" />

          <MDBInput
            type="email"
            placeholder="Email"
            v-model="email"
            wrapperClass="mb-4"
          />

          <MDBInput
            v-model="subject"
            placeholder="Subject"
            wrapperClass="mb-4"
          />

          <MDBTextArea placeholder="Message..." wrapperClass="mb-4" />

          <MDBBtn color="dark" block className="my-4">
            Send
          </MDBBtn>
        </form>
      </div>
    );
  };
  return (
    <>
      <div className="container py-5"
    style={{minHeight:`90vh`}}
      
      >
        <div className="row py-5">
          {loading ? <Loading /> : <ShowContact />}
        </div>
      </div>
    </>
  );
}
