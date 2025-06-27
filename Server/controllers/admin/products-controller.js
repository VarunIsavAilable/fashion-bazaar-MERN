import { imageUploadUtils } from '../../helpers/cloudinary.js'
import Product from '../../models/Product.js';

export async function handleImageUpload(req, res) {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error encountered!'
        });
    }
}

//add a new product
export async function addProduct(req, res){
    try {
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body

        if (!title || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "Title, price, and category are required fields."
        });
        }

        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        const result = await newlyCreatedProduct.save()


        res.status(201).json({
            success: true,
            data: newlyCreatedProduct
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error!"
        })
    }
}

//fetch all products
export async function fetchAllProduct(req, res){
    try {
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error!"
        })
    }
}

//edit a pruduct
export async function editProduct(req, res){
    try {
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error!"
        })
    }
}

//delete a product
export async function deleteProduct(req, res){
    try {
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error!"
        })
    }
}