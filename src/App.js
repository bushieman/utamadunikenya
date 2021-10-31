import React, { useEffect } from "react";

import { auth } from "./Firebase";
import { useStateValue } from "./Context";
import * as actions from "./ActionTypes";
import Billing from "./Billing";
import SignUp from "./SignUp";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) =>
      dispatch({
        type: actions.setUser,
        user,
      })
    );
  }, []);

  return (
    <div className="app">
      {/* <Billing /> */}
      <SignUp />
    </div>
  );
}

export default App;
