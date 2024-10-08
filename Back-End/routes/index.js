import { Router } from "express";
import Products from "../controllers/Products";

const router = Router();

router.get('/product-info', Products.getProductInfo)
router.get('/products-info', Products.getAllProductsInfo)
router.post('/create-product', Products.addNewProduct)
router.put('/update-product', Products.updateProduct)
// router.post('/change-product-quantity', Products.changeProductQuantity) TO:DO
// router.delete('/delete-product', Products.deleteProduct) TO:DO

export default router;