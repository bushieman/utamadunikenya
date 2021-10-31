import * as actions from "./ActionTypes";

export const initialState = {
  user: null,
  checkOutPrice: 1000,
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case actions.setUser:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
