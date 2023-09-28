import "./App.css";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./component/Products";
import Product from "./component/ShowProduct";
import Footer from "./component/Footer";
import Contact from "./component/Contact";
import About from "./component/About";
import Register from "./component/Register";
import Orders from "./component/Orders";
import Login from "./component/Login";
import Cart from "./component/Cart";
import Checkout from "./component/CheckOut";
import OrderStatus from "./component/OrderStatus";
import { login, setCart } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { base_url  , base_url_admin} from "./utils/environment";
import authenticatedRequest from "./utils/authenticatedRequest";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import 'primeicons/primeicons.css'; // Import the PrimeIcons CSS

    
//core
import "primereact/resources/primereact.min.css";       
import CreateProduct from "./component/CreateProduct";
import AdminViewProducts from "./component/AdminViewProducts";
import AdminVieworders from "./component/AdminViewOrders";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(`${base_url}user`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          dispatch(login({ id: data.id, name: data.name, email: data.email }));
          let cart = await authenticatedRequest({
            method: `GET`,
            url: `${base_url}cart`,
            token,
          });
          dispatch(setCart(cart));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/admin-create-product" Component={CreateProduct} />
        <Route exact path="/admin-view-products" Component={AdminViewProducts} />
        <Route exact path="/admin-view-orders" Component={AdminVieworders} />


        
        <Route exact path="/products/:id" Component={Product} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/orders" Component={Orders} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/checkout" Component={Checkout} />
        <Route exact path="/order-status" Component={OrderStatus} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
