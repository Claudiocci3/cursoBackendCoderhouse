class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    if ((title, description, price, thumbnail, code, stock)) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].code === code) {
          return console.log("ERROR: el codigo ya existe");
        }
      }
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.id,
      };
      this.products.push(product);
      this.id++;
    } else return console.log("Todos los campos son obligatorios");
  }
  getProducts() {
    return console.log(this.products);
  }
  getProductById(id) {
    const aux = this.products.find((e) => e.id === id);
    aux ? console.log(aux) : console.error("Not found");
  }
}
const producto = new ProductManager();
producto.addProduct(
  "producto prueba",
  "Esto es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
producto.addProduct(25);

producto.getProducts();

producto.addProduct(
  "producto prueba",
  "Esto es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

producto.getProductById(0);
