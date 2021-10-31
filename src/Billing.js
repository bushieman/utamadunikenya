import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Paypal from "./Paypal";
import Stripe from "./Stripe";

const stripe = loadStripe(
  "pk_test_51IVytKFaT1g74tpRdSkYBRvazh9CD2tuRoW5UGjjdmhj8LAKL5qQsznAU136npBmGq0VOMIaKE1iPDT3fYLtBUw100SndZVNUJ"
);

function Billing() {
  return (
    <div className="billing">
      <Paypal />
      <Elements stripe={stripe}>
        <Stripe />
      </Elements>
    </div>
  );
}

export default Billing;
