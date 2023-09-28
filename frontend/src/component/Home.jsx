import React from "react";
import Card from "react-bootstrap/Card";
import { client_base_url } from "../utils/environment";
import Products from "./Products";
import backGround from "./../assets/bg.jpg";

function Home() {
  
  return (
    <>
      <Card className="border-0 w-100">
        <Card.Img src={backGround} alt="Background" height={"550vh"} />
        <Card.ImgOverlay>
          <div className="container text-white">
            <Card.Title
              className="display-3 fw-bold"
              style={{ color: `black` }}
            >
              New Season Arrivals
            </Card.Title>
            <Card.Text className="lead fs-2" style={{ color: `black` }}>
              Check Out All The Trends
            </Card.Text>
          </div>
        </Card.ImgOverlay>
        <Products />
      </Card>
    </>
  );
}

export default Home;
