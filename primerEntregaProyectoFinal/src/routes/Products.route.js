const express = require('express');
const router = express.Router();
const ProductManager = require('../manager/ProductManager');

const productManager = new ProductManager();

router.get("/products", async (req, res) => {
    try {
      if (req.query.limit) {
        const limit = req.query.limit;
        const producto2 = await productManager.showLimit(limit); 
        res.send(producto2);
      } else {
        const producto = await productManager.getProducts();
        if(producto.length > 0) {
          res.send(producto);
        }else {
          res.status(204).send("No hay productos en el carrito")
        }
      }
    } catch (error) {
      console.log("Ha ocurrido un error en la obtención de productos", error);
      res.status(500).send("Error al obtener los productos.");
    }
});
  
router.get("/products/:pid", async (req, res) => {

    const pid = parseInt(req.params.pid);
    try {
      const productPid = await productManager.getProductById(pid);
      res.send(productPid);
    } catch (error) {
      res.send({ Error: "No se encontró el producto con el ID especificado" });
    }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    if (
      typeof newProduct.title !== "string" ||
      typeof newProduct.description !== "string" ||
      typeof parseInt(newProduct.price) !== "number" ||
      typeof newProduct.thumbnail !== "string" || 
      typeof newProduct.code !== "string" ||     
      typeof parseInt(newProduct.stock) !== "number" ||
      typeof Boolean(newProduct.status) !== "boolean"
    ) {
      return res.status(400).send("Los tipos de datos no son válidos");
    }

    await productManager.addProduct(newProduct);
    res.send('producto agregado con éxito');
  } catch (error) {
    console.log("ha ocurrido un error al agregar el producto", error);
    res.status(500).send('Error al agregar el producto');
  }
});

router.delete('/products/:pid', async (req, res)=>{

  const pid = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(pid);
    res.send("producto eliminado con exito")
  } catch (error) {
    console.log("ha ocurrido un error al eliminar el producto", error);
    res.status(500).send("error al eliminar el producto");
  }
})

router.put('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  const updatedProductData = req.body;
  const keys = Object.keys(updatedProductData); 
  const values = Object.values(updatedProductData); 

  try {
      
      await productManager.updateProduct(pid, keys, values[0]);
      res.send('Producto modificado exitosamente');
  } catch (error) {
      console.log("Ha ocurrido un error al modificar el producto", error);
      res.status(500).send("Error al modificar el producto");
  }
});



module.exports = router;