import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import authenticatedRequest from "../utils/authenticatedRequest";
import { base_url ,base_url_admin} from "../utils/environment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrders, setOrders as setOrdersRedux } from "../redux/action";
import { Button } from "primereact/button";
import Modal from "./../component/modal/Modal";


function Orders() {
  let dispatch = useDispatch();
  let token = localStorage.getItem(`token`);
  let [orders, setOrders] = useState([]);
  //
  useEffect(() => {
    (async () => {
      try {
        let orders = await authenticatedRequest({
          token,
          url: `${base_url_admin}admin/orders`,
          method: `GET`,
        });
        // console.log(orders);
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
          <Column field="id" header="id" style={{ width: "10%" }}></Column>
          <Column field="user_id" header="user id" style={{ width: "15%" }}></Column>
          <Column field="total_price" header="Total Price" style={{ width: "25%" }}></Column>
          <Column field="zipcode" header="Zip Code" style={{ width: "25%" }}></Column>
          <Column
            body={(data) => {
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
