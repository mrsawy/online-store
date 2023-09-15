import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { base_url } from "../utils/environment";
import  TextWithReadMore from "./readMoreAndLess/ReadMoreAndLess.js";

function AdminViewProducts() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${base_url}products`);
        setProducts(response.data.reverse());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      {" "}
      <div style={{ height: `100vh` }}>
        <div
          className="card"
          style={{
            padding: `32px 25px`,
            border: `1px solid grey`,
          }}
        >
          <DataTable
            value={products}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="title" header="Title" style={{ width: "25%" }}></Column>
            <Column field="price" header="Price" style={{ width: "25%" }}></Column>
            <Column
              body={(data) => {
                return (
                  <>
                  <TextWithReadMore 
                    text={data.description}
                    limit={100}

                  />
                   
                  </>
                );
              }}
              header="Action"
              style={{ width: "25%" }}
            ></Column>            <Column
              body={(data) => {
                return (
                  <>
                    {/* <Mo dal title={`Details`} data={data}></Modal> */}
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={async () => {
                        let token = localStorage.getItem(`token`);
                        const headers = {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                          accept: `application/json`,
                        };
                        await axios.delete(`${base_url}admin/products/${data.id}`, { headers });
                        Swal.fire({
                          position: "center-center",
                          type: "success",
                          icon: "success",
                          title: "Product has been Delete ✔👌",
                          showConfirmButton: true,
                          timer: 2000,
                        });
                        let response = await axios.get(`${base_url}products`);
                        setProducts(response.data.reverse());
                      }}
                    >
                      Delete
                    </button>
                  </>
                );
              }}
              header="Action"
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default AdminViewProducts;
