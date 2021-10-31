import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./Firebase";

function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      if (user) {
        // redirect user
      }
    });
  };

  return (
    <div className="signup">
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>signup</button>
    </div>
  );
}

export default SignUp;
