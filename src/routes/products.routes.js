import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";

const router = Router()

// Ver todos los productos existentes
router.get("/products/get", getProducts)

// Crear un producto (añadirlo a la BD)
router.post('/products/create', addProduct)

// Eliminar un producto
router.delete('/products/delete/:id', deleteProduct)

// Actualizar un producto
router.put('/products/update/:id', updateProduct)


export default router
