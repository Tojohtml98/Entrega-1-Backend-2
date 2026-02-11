class UserDTO {
  constructor(user) {
    // Aseguramos que siempre trabajamos con un objeto plano
    const plainUser = user.toObject ? user.toObject() : user;

    this.id = plainUser._id;
    this.first_name = plainUser.first_name;
    this.last_name = plainUser.last_name;
    this.email = plainUser.email;
    this.age = plainUser.age;
    this.role = plainUser.role;

    // Solo exponemos información básica del carrito, no todo el documento
    if (plainUser.cart) {
      const cartId = plainUser.cart._id || plainUser.cart;
      this.cart = {
        id: cartId
      };
    } else {
      this.cart = null;
    }
  }
}

module.exports = UserDTO;

