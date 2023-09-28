const initialAuth = {
  name: ``,
  id: ``,
  isLogged: false,
};

const authReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        isLogged: true,
      };

      break;

    case "LOGOUT":
      return initialAuth;
      break;

    default:
      return state;
      break;
  }
};

export default authReducer;
