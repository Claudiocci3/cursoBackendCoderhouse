const fs = require('fs').promises; // Utilizamos fs.promises para manejar promesas
const path = require('path');

const CARTS_PATH = path.join(__dirname, '..', 'files', 'carts.json'); // Ruta correcta

class CartManager {
    constructor() {
        this.products = []; // Aquí almacenaremos los carritos y sus productos
        this.idCounter = 0;
        this.init();
    }

    async init() {
		try {
		  if (await fs.stat(CARTS_PATH)) {
			const fileContent = await fs.readFile(CARTS_PATH, "utf-8");
			if (fileContent.trim()) {
			  this.products = JSON.parse(fileContent);
			  this.idCounter = this.products.length; // Corregir esta línea
			}
		  } else {
			await fs.writeFile(CARTS_PATH, "[]");
		  }
		} catch (error) {
		  console.log("Ha ocurrido un error:", error);
		}
	}
	

    async crearCarrito() {
        this.idCounter++;
        const newCart = {
            id: this.idCounter,
            products: []
        };

        try {
            this.products.push(newCart); // Agregar el carrito al array this.products
            await fs.writeFile(CARTS_PATH, JSON.stringify(this.products, null, 2));
            console.log('Nuevo carrito creado:', newCart);
        } catch (error) {
            console.log('Error al crear el carrito:', error);
        }
    }

    async addProduct(cartId, product) {
      const cartIndex = this.products.findIndex(cart => cart.id === cartId);
  
      if (cartIndex !== -1) {
          this.products[cartIndex].products.push(product);
  
          try {
              await fs.writeFile(CARTS_PATH, JSON.stringify(this.products, null, 2));
              console.log("Producto agregado al carrito:", product);
          } catch (error) {
              console.log("Error al agregar el producto:", error);
          }
      } else {
          console.log(`No se encontró un carrito con el ID ${cartId}`);
      }
  }

  async deleteProduct (cartId, product) {
    const cartIndex = this.products.findIndex(cart => cart.id === cartId);
    
    if (cartIndex !== -1) {
      this.products[cartIndex].products.pop(product);

      try {
          await fs.writeFile(CARTS_PATH, JSON.stringify(this.products, null, 2));
          console.log("Producto eliminado del carrito:", product);
      } catch (error) {
          console.log("Error al eliminar el producto:", error);
      }
  } else {
      console.log(`No se encontró un carrito con el ID ${cartId}`);
  }
  }
  
}


module.exports = CartManager;
