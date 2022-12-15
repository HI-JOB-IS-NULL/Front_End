import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/ProductService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import { ServerIP } from "../IP";
import "../css/DataTableDemo.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const DataTableRowExpansionDemo = () => {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [changeData, setChangeData] = useState(true);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const summary =
  //       expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
  //     toast.current.show({
  //       severity: "success",
  //       summary: `${summary}`,
  //       life: 3000
  //     });
  //   }
  // }, [expandedRows]);

  function accept(id) {
    console.log("id:aaaa ", id);
    if (accessToken && accessToken !== null) {
      axios({
        method: "POST",
        url: `${ServerIP}/order/cancel`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          orderId: id,
        },
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          if (changeData == true) {
            setChangeData(false);
          } else {
            setChangeData(true);
          }
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    }
  }

  const reject = () => {};

  useEffect(() => {
    isMounted.current = true;
    console.log("accessToken", accessToken);
    if (accessToken && accessToken !== null) {
      axios({
        method: "GET",
        url: `${ServerIP}/order`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          setProducts(res.data.orders.content);
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    }
    //    productService.getProductsWithOrdersSmall().then((data) => {
    //         setProducts(data);
    //         console.log(data);
    //       });
  }, [changeData]); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.orderId,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.orderId,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};
    products.forEach((p) => (_expandedRows[`${p.orderId}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const formatCurrency = (value) => {
    let price = value.orderPrice;
    return price + "원";
  };

  const amountBodyTemplate = (rowData) => {
    return rowData.count + "개";
  };

  const searchItem = (rowData) => {
    console.log("row", rowData.productNm);
    axios({
      method: "GET",
      url: `${ServerIP}/shop/productListByPName`,
      params: {
        productName: rowData.productNm,
      },
    }).then(function (res) {
      if (res.status === 200) {
        console.log(res.data);
        let pi = res.data.data[0].product_id;
        window.location.href = `/ProductDetailes/${pi}`;
      } else if (res.status === 403) {
        alert("잘못된 접근입니다");
      } else {
        new Error(res);
      }
    });
  };

  const searchBodyTemplate = (rowData) => {
    return <Button onClick={() => searchItem(rowData)} icon="pi pi-search" />;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.imgUrl}
        alt={rowData.imgUrl}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    let total = 0;
    rowData.orderProductDtoList.map((items) => {
      total += items.orderPrice * items.count;
    });
    return "₩" + total;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.orderStatus.toLowerCase()}`}
      >
        {rowData.orderStatus}
      </span>
    );
  };

  const billBodyTemplate = (rowData) => {
    return (
      <Button
        onClick={() =>
          window.open(
            rowData.preceipt_url,
            "window_name",
            "width=430, height=500, location=no, status=no, scrollbars=yes"
          )
        }
      >
        Bill
      </Button>
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.orderProductDtoList.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <tr>
          <td>
            <h5>Orders for {data.orderId}</h5>
          </td>
          <td style={{ padding: "5px" }}>
            {data.orderStatus != "CANCEL" ? (
              <div>
                <ConfirmDialog
                  visible={visible}
                  onHide={() => setVisible(false)}
                  message="Are you sure you want to Cancel?"
                  header="Confirmation"
                  icon="pi pi-exclamation-triangle"
                  accept={() => accept(data.orderId)}
                  reject={reject}
                />
                <Button
                  onClick={() => setVisible(true)}
                  icon="pi pi-check"
                  label="Cancel Order"
                  className="p-button-outlined p-button-danger"
                  style={{ padding: "revert" }}
                />
              </div>
            ) : null}
          </td>
        </tr>
        <DataTable value={data.orderProductDtoList} responsiveLayout="scroll">
          <Column field="productNm" header="ProductName" sortable></Column>
          <Column header="Image" body={imageBodyTemplate} />
          <Column
            field="orderPrice"
            header="Price"
            body={formatCurrency}
            sortable
          ></Column>
          <Column
            field="count"
            header="Amount"
            body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="table-header-container">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
    </div>
  );

  return (
    <div className="datatable-rowexpansion-demo">
      <Toast ref={toast} />

      <div className="card" style={{ width: "auto" }}>
        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="orderId"
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "3em" }} />
          <Column field="orderId" header="OrderId" sortable />
          <Column
            field="price"
            header="TotalPrice"
            body={priceBodyTemplate}
            sortable
          />
          <Column field="orderDate" header="Date" sortable></Column>
          <Column
            field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
          />
          <Column field="preceipt_url" header="Bill" body={billBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};
export default DataTableRowExpansionDemo;
