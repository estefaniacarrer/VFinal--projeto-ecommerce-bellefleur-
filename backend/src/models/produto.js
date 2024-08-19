import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const ProdutoSchema = new Schema(
  {
    nomeProduto: {
      type: String,
      required: true,
    },
    precoPadrao: {
      type: Number,
      required: true,
    },
    precoPromocional: {
      type: Number,
      required: false,
    },
    imagem: {
      type: [String],
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Produto = mongoose.model('Produto', ProdutoSchema);

export default Produto;
