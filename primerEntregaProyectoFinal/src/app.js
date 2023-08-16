const express = require('express');
//require productManager
const app = express();

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const rutaProducts = require('./routes/Products.route');
const rutaCart = require('./routes/Carts.route');
app.use('/api', rutaProducts);
app.use('/api', rutaCart);

app.listen(PORT, () => {
    console.log(`server escuchando en ${PORT}`);
})