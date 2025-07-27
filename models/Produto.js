import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  preco: Number,
  imagem: String,
  categoria: String,
});

export default mongoose.model("Produto", ProdutoSchema);
