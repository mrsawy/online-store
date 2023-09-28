import React, { useState } from "react";
import { useEffect } from "react";
import { base_url ,base_url_admin} from "../utils/environment";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  let [productData, setProductData] = useState({
    title: ``,
    category_id: null,
    description: ``,
    price: null,
    image: null,
    isSubmit: false,
  });
  let [categories, setCategories] = useState(null);
  useEffect(() => {
    (async () => {
      let response = await fetch(`${base_url}categories`);
      let data = await response.json();
      setCategories(data);
      setProductData((p) => ({ ...p, category_id: data[0].id }));
    })();
  }, []);
  let nav = useNavigate();

  let submitHandler = async (e) => {
    e.preventDefault();
    let body = Object.entries(productData).map((p) => ({ key: p[0], value: p[1] }));
    const formDataObj = new FormData();
    body.forEach((e, i) => {
      formDataObj.append(e.key, e.value);
    });

    setProductData((p) => ({ ...p, isSubmit: true }));
    try {
      let token = localStorage.getItem(`token`);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let axiosResponse = await axios.post(`${base_url_admin}products`, formDataObj, { headers });
      console.log(axiosResponse);
      if (axiosResponse.status >= 200) {
        Swal.fire({
          position: "center-center",
          type: "success",
          icon: "success",
          title: "Your Product has been Created ✔👌",
          showConfirmButton: true,
          timer: 2000,
        });
        setTimeout(() => {
          nav(`/`);
        }, 2100);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    if (e.target.name === `image`) {
      const file = e.target.files[0];
      setProductData((p) => ({ ...p, image: file }));
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="p-5" style={{ minHeight: `80vh` }}>
      <form className="col-lg-6 d-flex flex-column" style={{ gap: 30 }} onSubmit={submitHandler}>
        <div class="form-group">
          <label for="exampleProductTitle">Product title :</label>
          <input
            required
            type="text"
            class="form-control"
            id="exampleProductTitle"
            placeholder="title"
            name="title"
            onChange={changeHandler}
          />
          <small id="titleHelp" class="form-text text-muted">
            make the title attractive to customers{" "}
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputDescription">Description :</label>
          <input
            value={productData.description}
            required
            type="textArea"
            class="form-control"
            name="description"
            id="exampleInputDescription"
            placeholder="Product Description"
            onChange={changeHandler}
          />
        </div>

        <div class="form-group">
          <label>Price :</label>
          <input
            value={productData.price}
            required
            type="number"
            name="price"
            onChange={changeHandler}
            class="form-control"
            id="price"
            placeholder="Product Price"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Category :</label>
          <select
            value={productData.category_id}
            required
            class="form-control"
            name="category_id"
            onChange={changeHandler}
            id="exampleFormControlSelect1"
          >
            {Array.isArray(categories) &&
              categories.map((category, i) => <option value={category.id}>{category.name}</option>)}
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlFile1">Product Image :</label>
          <br />
          <input
            required
            name="image"
            onChange={changeHandler}
            accept="image/png"
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>
        <button type="submit" class="btn btn-primary h-50 m-auto">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
