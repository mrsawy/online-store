let checkIsInCart = (id = null, cartProducts = []) => {
  if (id && cartProducts) {
    console.log(cartProducts , id);
    return !!cartProducts.find((product) => product.id === id);
  }
  return false
};

export default checkIsInCart;
