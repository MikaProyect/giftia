import { Router } from "express";
import { addProduct, getProducts } from "../controllers/products.controller.js";

const router = Router()

// Ver todos los productos existentes
router.get("/products/get", getProducts)

// Crear un producto (añadirlo a la BD)
router.post('/products/create', addProduct)

export default router
