import React from "react";
import Card from "react-bootstrap/Card";
import Products from "./Products";

function Home() {
  return (
    

 <>
    <Card  className="border-0 w-100">
      <Card.Img src="/assets/bg.jpg" alt="Background"   height={'550vh'} />
      <Card.ImgOverlay>
        <div className="container text-white">
        <Card.Title className="display-3 fw-bold">New Season Arrivals</Card.Title>
        <Card.Text className="lead fs-2">
            Check Out All The Trends
        </Card.Text>

        </div>
        

      </Card.ImgOverlay>
      <Products/>
    </Card>

 </>
  );
}

export default Home;
