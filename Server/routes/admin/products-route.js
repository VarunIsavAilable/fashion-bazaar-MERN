import express from 'express';
import { handleImageUpload, addProduct, editProduct, fetchAllNewProduct, deleteProduct } from '../../controllers/admin/products-controller.js';
import { upload } from '../../helpers/cloudinary.js'; // 👈 fixed import

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

router.post('/add', addProduct)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/fetchAllProducts', fetchAllNewProduct)

export default router;
