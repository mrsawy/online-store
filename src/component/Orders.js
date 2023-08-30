import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import authenticatedRequest from "../utils/authenticatedRequest";
import { base_url } from "../utils/environment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrders, setOrders as setOrdersRedux } from "../redux/action";
import { Button } from "primereact/button";
import Modal from "./../component/modal/Modal";

// let orders

function Orders() {
  let token = localStorage.getItem(`token`);
  let [orders, setOrders] = useState([]);
  let s = useSelector((s) => s.orders);
  useEffect(() => {
    console.log(s);
  }, [s]);
  let dispatch = useDispatch();

  // setC
  useEffect(() => {
    (async () => {
      try {
        let orders = await authenticatedRequest({
          token,
          url: `${base_url}orders`,
          method: `GET`,
        });
        setOrders(orders.reverse());
        dispatch(setOrdersRedux(orders));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div style={{ height: `100vh` }}>
      <div
        className="card"
        style={{
          padding: `32px 25px`,
          height: `100vh`,

          border: `1px solid grey`,
        }}
      >
        <DataTable
          value={orders}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="user_id" header="id" style={{ width: "25%" }}></Column>
          <Column
            field="total_price"
            header="Total Price"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="zipcode"
            header="Zip Code"
            style={{ width: "25%" }}
          ></Column>
          <Column
            body={(data) => {
            //   console.log(data);
              return (
                <>
                  <Modal title={`Details`} data={data}></Modal>
                </>
              );
            }}
            header="Action"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Orders;
