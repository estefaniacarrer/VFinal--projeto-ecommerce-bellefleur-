import mongoose from "../db/conn.js";
const { Schema } = mongoose;


const SacolaSchema = new Schema(
  {
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false } // evitar criar um id separado para cada item da sacola
);

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    dataNascimento: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    sacolaItems: {
      type: [SacolaSchema],
      default: [],
    },
    favoritos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Produtos",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

