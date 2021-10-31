import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      if (user) {
        // nandle redirect
      }
    });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // signInWithRedirect()
    signInWithPopup(auth, provider).then((user) => {
      if (user) {
        // nandle redirect
      }
    });
  };

  return <div className="login"></div>;
}

export default Login;
