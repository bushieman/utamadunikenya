import React, { createContext, useReducer, useContext } from "react";

export const ReactContext = createContext();

export const Context = ({ children, reducer, initialState }) => (
  <ReactContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ReactContext.Provider>
);

export const useStateValue = () => useContext(ReactContext);
