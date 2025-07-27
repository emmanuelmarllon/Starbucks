import express from "express";
import {
  getProdutos,
  createProduto,
  deleteProduto,
} from "../controllers/produtoController.js";

const router = express.Router();

router.get("/", getProdutos);
router.post("/", createProduto);
router.delete("/:id", deleteProduto);
export default router;
