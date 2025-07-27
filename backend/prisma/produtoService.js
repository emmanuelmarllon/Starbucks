import prisma from "./prismaClient.js";

export async function getProdutos() {
  return await prisma.produto.findMany();
}

export async function createProduto(data) {
  return await prisma.produto.create({ data });
}

export async function deleteProduto(id) {
  return await prisma.produto.delete({
    where: { id },
  });
}
