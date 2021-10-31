import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useStateValue } from "./Context";

function Paypal() {
  const [{ checkOutPrice }] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");

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
      console.log("approved details", details);
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
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
    </PayPalScriptProvider>
  );
}

export default Paypal;
