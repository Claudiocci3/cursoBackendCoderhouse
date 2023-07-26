const fs = require("fs");
class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.path = "./productos.json";
    this.init();
  }
  async init() {
    try {
      if (fs.existsSync(this.path)) {
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        if (fileContent) {
          this.products = JSON.parse(fileContent);
          this.id = this.products.length; // Actualiza el contador de ID
        } else {
          this.products = [];
          this.id = 0;
        }
      } else {
        await fs.promises.writeFile(this.path, "[]"); // Crea un archivo vacío con un array JSON vacío
        this.products = [];
        this.id = 0;
      }
    } catch (error) {
      console.log("Ha ocurrido un error: ", error);
    }
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    if (title && description && price && thumbnail && code && stock) {
      const existingProduct = this.products.find(
        (product) => product.code === code
      );
      if (existingProduct) {
        return console.log("ERROR: el código ya existe");
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

      try {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Producto subido con éxito");
      } catch (error) {
        console.log("Ha ocurrido un error: ", error);
      }
    } else {
      console.log("Todos los campos son obligatorios");
    }
  }

  async getProducts() {
    try {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      if (fileContent.trim() !== "") {
        const products = JSON.parse(fileContent);
        console.log(products);
      } else {
        console.log("No hay productos disponibles.");
      }
    } catch (error) {
      console.log("Ha ocurrido un error: ", error);
    }
  }

  async updateProduct(id, campo_a_modificar, nuevoValor) {
    try {
      let fileContent = await fs.promises.readFile(this.path, "utf-8");
      let products = JSON.parse(fileContent);
      const index = products.findIndex((e) => e.id === id);
      if (index !== -1) {
        let product = products[index];
        if (product.hasOwnProperty(campo_a_modificar)) {
          product[campo_a_modificar] = nuevoValor;
          products[index] = product;
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
          );
          console.log("Se modificó el campo:", campo_a_modificar);
          console.log("Nuevo valor:", nuevoValor);
        } else {
          console.log("El campo a modificar no existe en el producto.");
        }
      } else {
        console.log("No se encontró el producto con el ID especificado.");
      }
    } catch (error) {
      console.log("Hay un error:", error);
    }
  }

  async getProductById(id) {
    try {
      let fileContent = await fs.promises.readFile(this.path);
      let product = JSON.parse(fileContent);
      let buscandoId = product.find((e) => e.id === id);
      if (buscandoId) {
        console.log(`El producto con el id: ${id} es:`, buscandoId);
      } else {
        console.log("No se encontro el id ingresado");
      }
    } catch (error) {
      console.log("Ha ocurrio un error:", error);
    }
  }
  async deleteProduct(id) {
    try {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      let products = JSON.parse(fileContent);
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        console.log("Producto eliminado con éxito");
      } else {
        console.log("No se encontró un producto con el ID especificado");
      }
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
    }
  }
}

const producto = new ProductManager();
// producto.getProducts();
producto.addProduct({
  title: "Producto a prueba",
  description: "Este es un producto a prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});
