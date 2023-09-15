import React, { useState, useRef } from "react";
import classes from "./Modal.module.css";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { OrderList } from "primereact/orderlist";

function Modal(props) {
  let modelClass = `${classes.general} ${classes.fade} d-none`;
  const [classM, setClassM] = useState(modelClass);
  let show = `${classes.general} `;
  let fade = `${classes.general} ${classes.fade}`;
  let disAppear = `${classes.general} ${classes.fade} d-none`;
  const targetRef = useRef();

  const itemTemplate = (item) => {
    return (
      <div
        className="d-flex flex-row flex-wrap-nowrap flex-nowrap justify-content-between justify-content-space-between p-2 align-items-center gap-3"
        style={{ flexWrap: `nowrap` }}
      >
        <div
          className="d-flex flex-row flex-wrap-nowrap flex-nowrap justify-content-between justify-content-space-between p-2 align-items-center gap-3"
          style={{ flexWrap: `nowrap` }}
        >
          <img
            className="w-4rem shadow-2 flex-shrink-0 border-round"
            src={item.image}
            alt={item.name}
            style={{ width: 50, height: `auto` }}
          />
          <div className="flex-column gap-2 xl:mr-8">
            <span className="font-bold">{item.title}</span>
            <div className="d-flex align-items-center gap-2">
              <i className="pi pi-tag text-sm"></i>
              <span>{item.category}</span>
            </div>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };

  return (
    <div className="p-relative">
      <div
        onClick={() => {
          setClassM(fade);
          setTimeout(() => {
            setClassM(show);
          }, 90);
        }}
      >
        {props.custom ? (
          props.custom
        ) : (
          <Button
            label="View"
            className={"btn btn-primary  pt-0 pb-0"}
            style={{ lineHeight: 2.5, ...props.btnStyle }}
          />
        )}
      </div>

      <div
        className={classM}
        onClick={(e) => {
          if (targetRef.current && !targetRef.current.contains(e.target)) {
            setClassM(fade);
            setTimeout(() => {
              setClassM(disAppear);
            }, 600);
          }
        }}
      >
        <div
          ref={targetRef}
          className={`modal-dialog ${classes["modal-content"]}`}
          role="document"
        >
          <div class="modal-content ">
            <div class="modal-header p-2">
              <h4 class="modal-title" id="exampleModalLabel">
                {props?.title ? props.title : `Modal title`}
              </h4>
              <Button
                severity="secondary"
                aria-label="Bookmark"
                type="button"
                onClick={() => {
                  setClassM(fade);
                  setTimeout(() => {
                    setClassM(disAppear);
                  }, 600);
                }}
              >
                <span
                  className="text-center"
                  style={{
                    fontSize: `28px`,
                    lineHeight: `1`,
                    transform: `translateY(-2px)`,
                  }}
                >
                  &times;
                </span>
              </Button>
            </div>
            <div class="modal-body">
              <div className="d-fex flex-row justify-content-center">
                <div className="card xl:flex xl:justify-content-center">
                  <OrderList
                    value={props.data.products}
                    itemTemplate={itemTemplate}
                    dragdrop={true}
                    moveUpIcon={false}
                    className={`h-100`}
                    style={{ maxHeight: `100%` }}
                    header="Products"
                    filter
                    filterBy="title"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  ></OrderList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
