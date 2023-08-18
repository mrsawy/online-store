const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      // Check if Product is Already Exist

      const exist = state.find((item) => item.id === product.id);
      if (exist) {
        // Increase the quantity
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
            
        );
      
      } else {
        const product = action.payload;
        return [
          ...state,
          {
            product,
            quantity: 1,

          }
        ];
      }
      break;
      case "DELETE_ITEM_FROM_CART" : 
      const exist1 = state.find((item) => item.id === product.id);
      if (exist1.quantity === 1) {
        return state.filter((item) => item.id!== exist1.id);

      }else{
        return state.map((item) =>
          item.id === product.id
           ? {...item, quantity: item.quantity - 1 }
            : item
        );
      }
      break;
    default:

    return state;
      break;
  }
};

export default handleCart;
