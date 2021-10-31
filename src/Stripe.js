import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import "./Stripe.scss";
import { useStateValue } from "./Context";
import axios from "./Axios";
import payment from "./assets/images/payment.jpg";

function StripeForm({ stripe, elements }) {
  const [{ checkOutPrice }] = useStateValue();
  const [clientSecret, setClientSecret] = useState("");
  const [payload, setPayload] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/billing?total=${checkOutPrice}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);

  useEffect(() => {
    if (payload.paymentIntent?.status == "succeeded") {
      setPaymentSuccessful(true);
    } else {
      console.log("There was an error completing the purchase");
    }
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
      },
    });
    setPayload(payload);
  };

  const cardOptions = {
    style: {
      base: {
        fontSize: "18px",
        color: "#87bbfd",
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontFamily: "Source Code Pro, monospace",
        fontSmoothing: "antialiased",
        iconColor: "#ffc7ee",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  return (
    <div className="stripe">
      <form className="stripe__form" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Card number
          <CardNumberElement options={cardOptions} />
        </label>
        <label>
          Expiration date
          <CardExpiryElement options={cardOptions} />
        </label>
        <label>
          CVC
          <CardCvcElement options={cardOptions} />
        </label>
        <button className="stripe__btn" onClick={(e) => handleSubmit(e)}>
          Pay
        </button>
      </form>
      <div
        className={`stripe__consent ${
          paymentSuccessful ? "stripe__consent--success" : ""
        }`}
      >
        <img src={payment} alt="#" />
      </div>
    </div>
  );
}

function Stripe() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <StripeForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

export default Stripe;
