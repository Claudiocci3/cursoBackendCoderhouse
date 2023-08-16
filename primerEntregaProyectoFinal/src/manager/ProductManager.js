const fs = require("fs").promises;
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, '../files/products.json');

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.init();
  }

  async init() {
    try {
      if (await fs.stat(PRODUCTS_PATH)) {
        const fileContent = await fs.readFile(PRODUCTS_PATH, "utf-8");
        if (fileContent.trim()) {
          this.products = JSON.parse(fileContent);
          this.id = this.products.length;
        }
      } else {
        await fs.writeFile(PRODUCTS_PATH, "[]");
      }
    } catch (error) {
      console.log("Ha ocurrido un error:", error);
    }
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock, status } = product;
    if (title && description && price && thumbnail && code && stock && status) {
      const existingProduct = this.products.find(
        (product) => product.code === code
      );
      if (existingProduct) {
        throw new Error("ERROR: el código ya existe");
      }

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.id,
        status
      };
      this.products.push(newProduct);
      this.id++;

      try {
        await fs.writeFile(
          PRODUCTS_PATH,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Producto subido con éxito");
      } catch (error) {
        console.log("Ha ocurrido un error:", error);
      }
    } else {
      throw new Error("Todos los campos son obligatorios");
    }
  }

  async getProducts() {
    return this.products;
  }

  async updateProduct(id, fieldToUpdate, newValue) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const product = this.products[productIndex];
      if (product.hasOwnProperty(fieldToUpdate)) {
        product[fieldToUpdate] = newValue;
        await fs.writeFile(
          PRODUCTS_PATH,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Se modificó el campo:", fieldToUpdate);
        console.log("Nuevo valor:", newValue);
      } else {
        console.log(`el campo ${fieldToUpdate} no existe en el producto`);
      }
    } else {
      console.log("No se encontró el producto con el ID especificado.");
    }
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) return product;
    else {
      throw new Error("No se encontró un producto con el ID: ", id);
    }
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      try {
        await fs.writeFile(
          PRODUCTS_PATH,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Producto eliminado con éxito");
      } catch (error) {
        console.log("Error al eliminar el producto:", error);
      }
    } else {
      console.log("No se encontró un producto con el ID especificado");
    }
  }

  async showLimit(n) {
    const primerosNProductos = this.products.slice(0, n);
    return primerosNProductos;
  }
  
}

module.exports = ProductManager;
const producto = new ProductManager();