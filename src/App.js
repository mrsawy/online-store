import "./App.css";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import {  Route , Routes } from "react-router-dom";
import Products from "./component/Products";
import Product from './component/ShowProduct';
import Footer from './component/Footer';
import Contact from "./component/Contact";
import About from "./component/About";
import Register from "./component/Register";
import Login from "./component/Login";
import Cart from "./component/Cart";
import Checkout from "./component/CheckOut";
import OrderStatus from "./component/OrderStatus";
function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/products/:id" Component={Product} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/checkout" Component={Checkout} />
        <Route exact path="/order-status" Component={OrderStatus} />
        
      </Routes>
      <Footer  />

    </>
  );
}

export default App;
