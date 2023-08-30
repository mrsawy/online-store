const initialAuth = {orders:[], currentOrder:undefined}

const orderReducer = (state = initialAuth, action) => {
  switch (action.type) {

    case "SET_ORDER":
      return {...state, orders:action.payload};
      break;

      case "SET_CURRENT_ORDER":
        return {...state, currentOrder:action.payload};
        break;

    default:
      return state;
      break;
  }
};

export default orderReducer;
