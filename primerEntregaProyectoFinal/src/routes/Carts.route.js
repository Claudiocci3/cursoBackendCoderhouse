const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../manager/ProductManager');
const productManager = new ProductManager();
const CartManager = require('../manager/CartManager');
const cartManager = new CartManager();

router.post('/carts', (req, res) => {
    try {
        cartManager.crearCarrito();
        res.status(200).send("carrito creado");
    } catch (error) {
        res.status(404).send("error al crear el carrito", error);
    }
})
router.get('/carts', (req, res) => {
  const filePath = path.join(__dirname, '../files/carts.json');
  res.sendFile(filePath);
});
router.put('/carts/:cid/products/:pid/:units', async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const unit = parseInt(req.params.units);
  try {
      await cartManager.init();
      
      const product = await productManager.getProductById(pid);
      
      if (!product) {
          return res.status(404).send("No se encontró el producto con el ID: " + pid);
      }
      if(unit) {
        for (let i = 0; i < unit; i++) {
          cartManager.addProduct(cid, product);
        }
      }else {
        cartManager.addProduct(cid, product);
      }
      
      res.status(200).send("Producto agregado al carrito con éxito");
  } catch (error) {
      console.log('Error:', error);
      res.status(500).send("Error interno del servidor: " + error.message);
  }
});

router.delete('/carts/:cid/products/:pid/:units', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const unitsToRemove = parseInt(req.params.units);

    try {
      await cartManager.init();
      
      const product = await productManager.getProductById(pid);
      
      if (!product) {
          return res.status(404).send("No se encontró el producto con el ID: " + pid);
      }
      if(unitsToRemove) {
        for (let i = 0; i < unitsToRemove; i++) {
          cartManager.deleteProduct(cid, product);
        }
      }
    
      res.status(200).send("Producto eliminado con éxito");
  } catch (error) {
      console.log('Error:', error);
      res.status(500).send("Error al eliminar el producto: " + error.message);
  }

});

module.exports = router;