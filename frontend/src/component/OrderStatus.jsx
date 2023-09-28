import "./Style/OrderStatus.css";
import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

export default function OrderStatus() {

    //Set Current Date

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;
  
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <h1 className="text-center mt-0 fw-bold pt-5 mb-0 ">Order Status</h1>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Purchase Reciept
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{currentDate}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>012j1gvs356c</p>
                    </MDBCol>
                  </MDBRow>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p>BEATS Solo 3 Wireless Headphones</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p>£299.99</p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p className="mb-0">Shipping</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p className="mb-0">£33.00</p>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        £262.99
                      </p>
                    </MDBCol>
                    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol className="d-flex justify-content-around" > 
                        <h5 >Rider Phone</h5> 
                        <span  style={{fontSize: 20 , color:'#f37a27' }}><i class="fa fa-phone"></i></span>
                    </MDBCol>
                  </MDBRow>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    Tracking Order
                  </p>

                  <MDBRow>
                    <MDBCol lg="12">
                      <div className="horizontal-timeline">
                        <ul className=" order-status list-inline items d-flex justify-content-between">
                          <li className=" list-inline-item items-list">
                            <p
                              className="py-1 px-2  rounded text-white"
                              style={{ backgroundColor: "#f37a27" }}
                            >
                              Ordered
                            </p>
                          </li>
                          <li className="list-inline-item items-list">
                            <p
                              className="py-1 px-2 rounded text-white"
                              style={{ backgroundColor: "#f37a27" }}
                            >
                              Shipped
                            </p>
                          </li>
                          <li className="list-inline-item items-list">
                            <p
                              className="py-1 px-2 rounded text-white"
                              style={{ backgroundColor: "#f37a27" }}
                            >
                              On the way
                            </p>
                          </li>
                          <li
                            className="list-inline-item items-list text-end"
                            style={{ marginRight: "-8px" }}
                          >
                            <p id="delivered" style={{ marginRight: "-8px" }}>Delivered</p>
                          </li>
                        </ul>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <p className="mt-4 pt-2 mb-0">
                    Want any help?{" "}
                    <a href="/contact" style={{ color: "#f37a27" }}>
                      Please contact us
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
