const {Router } = require('express');
const router = Router();
const Image = require('../models/Image');
const Product = require('../models/Product');
const { unlink } = require('fs-extra');
const path = require('path');



router.get('/',async (req, res) => {
    const images = await Image.find();
    res.render('index', {images});
});
router.get('/upload', (req, res) => {
    // res.send('Form Upload');
    res.render('upload');
});
router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const {id} = req.params;
    const image = await Image.findById(id);
    console.log(image);
    res.render('profile', {image});
});
router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});
/////////////////////////PRODUCTOS/////////////////////////


router.get('/product',async (req, res) => {
    const products = await Product.find();
    res.render('article', {products});
});
router.get('/uploadProduct', (req, res) => {
    // res.send('Form Upload');
    res.render('uploadArticle');
});
router.post('/uploadProduct', async (req, res) => {
    const product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.precio = req.body.precio;
    product.filename = req.file.filename;
    product.path = '/img/uploads/' + req.file.filename;
    product.originalname = req.file.originalname;
    product.mimetype = req.file.mimetype;
    product.size = req.file.size;

    await product.save();
    res.redirect('/product');
});

router.get('/imageProduct/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('profileArticle', {product});
});
router.get('/imageProduct/:id/delete', async (req, res) => {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + productDeleted.path));
    res.redirect('/product');
});

module.exports = router;