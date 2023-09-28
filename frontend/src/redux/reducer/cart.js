const initialAuth = []

const cartReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
      break;

    case "REMOVE_FROM_CART":
      return state.filter((p) => p.id !== action.payload);
      break;
    case "SET_CART":
      return action.payload;
      break;

    default:
      return state;
      break;
  }
};

export default cartReducer;
