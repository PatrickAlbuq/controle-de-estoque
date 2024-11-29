import { Router } from "express";
import Products from "../controllers/Products";

const router = Router();

router.get('/product-info', Products.getProductInfo)
router.get('/products-info', Products.getAllProductsInfo)
router.post('/create-product', Products.addNewProduct)
router.post('/add-product-quantity', Products.addProductQuantity)
router.post('/remove-product-quantity', Products.removeProductQuantity)
router.put('/update-product', Products.updateProduct)
router.delete('/delete-product', Products.deleteProduct)

export default router;