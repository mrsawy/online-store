const initialAuth = { orders: [], currentOrder: undefined };

const orderReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return { ...state, orders: action.payload };

    case "SET_CURRENT_ORDER":
      return { ...state, currentOrder: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
