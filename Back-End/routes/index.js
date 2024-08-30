import { Router } from "express";
import Products from "../controllers/Products";

const router = Router();

router.get('/product-info', Products.getProductInfo)
router.get('/products-info', Products.getAllProductsInfo)
// router.post('/create-product', Products.addNewProduct) TO:DO
// router.post('/update-product', Products.updateProduct) TO:DO
// router.post('/change-product-quantity', Products.changeProductQuantity) TO:DO
// router.delete('/delete-product', Products.deleteProduct) TO:DO

export default router;