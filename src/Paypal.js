import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./Paypal.scss";
import payment from "./assets/images/payment.jpg";
import { useStateValue } from "./Context";

function Paypal() {
  const [{ checkOutPrice }] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [payload, setPayload] = useState("");

  useEffect(() => {
    console.log(payload.status);
    if (payload.status == "COMPLETED") {
      setSucceeded(true);
    } else {
      console.log("There was an error completing the purchase");
    }
    setTimeout(function () {
      setSucceeded(false);
    }, 6000);
  }, [payload]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: `${checkOutPrice / 100}`,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setPayload(details);
    });
  };
  const onError = (data, actions) => {
    setPaypalErrorMessage("Something went wrong with your payment");
  };

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        style={{
          color: "silver",
          shape: "pill",
          label: "paypal",
          height: 40,
        }}
        fundingSource={window.paypal.FUNDING.PAYPAL}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onError={(data, actions) => onError(data, actions)}
      />
      <div
        className={`paypal__consent ${
          succeeded
            ? "paypal__consent--activated"
            : "paypal__consent--deactivated"
        }`}
      >
        <img src={payment} alt="#" />
      </div>
    </PayPalScriptProvider>
  );
}

export default Paypal;
