export const addItem = (product) => {
    return {
        type : "ADDITEM",
        payload : product
    }
}

export const delItem = (product) => {
    return {
        type : "DELITEM",
        payload : product
    }
}

export const register = (data) => {
    return {
        type : "REGISTER",
        payload : data
    }
}
export const login = (data) => {
    return {
        type : "LOGIN",
        payload : data
    }
}
export const logout = (data) => {
    localStorage.removeItem(`user`)
    localStorage.removeItem(`id`)
    localStorage.removeItem(`token`)
    return {
        type : "LOGOUT",
        payload : data
    }
}

export const addToCart = (data) => {
    return {
        type : "ADD_TO_CART",
        payload : data
    }
}
export const removeFromCart = (data) => {
    return {
        type : "REMOVE_FROM_CART",
        payload : data
    }
}
export const setCart = (data) => {
    return {
        type : "SET_CART",
        payload : data
    }
}

export const setOrders = (data) => {
    return {
        type : "SET_ORDER",
        payload : data
    }
}
export const setCurrentOrder = (data) => {
    return {
        type : "SET_CURRENT_ORDER",
        payload : data
    }
}