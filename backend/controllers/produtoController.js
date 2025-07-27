import {
  getProdutos as getProdutosService,
  createProduto as createProdutoService,
  deleteProduto as deleteProdutoService,
} from "../prisma/produtoService.js";
import prisma from "../prisma/prismaClient.js";
export async function getProdutos(req, res) {
  try {
    const produtos = await getProdutosService();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro interno ao buscar produtos" });
  }
}

export const createProduto = async (req, res) => {
  try {
    const novoProduto = await createProdutoService(req.body);
    res
      .status(201)
      .json({ message: "Produto criado com sucesso", produto: novoProduto });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro interno ao criar produto" });
  }
};

export const deleteProduto = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProdutoService(id);
    res.status(204).send(); // sucesso, sem conteúdo
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro interno ao deletar produto" });
  }
};
