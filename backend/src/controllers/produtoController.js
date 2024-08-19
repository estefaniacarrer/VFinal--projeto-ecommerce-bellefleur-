import Produto from "../models/produto.js";
import getUserByToken from "../util/get-user-by-token.js";
import getToken from "../util/get-token.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const create = async (req, res) => {
  const { nomeProduto, precoPadrao, precoPromocional, categoria } = req.body;
  const imagem = req.files; 

  if (!nomeProduto || !precoPadrao || !categoria || !imagem) {
    return res.status(422).json({ message: "Campo obrigatório!" });
  }

  const token = getToken(req);
  const user = await getUserByToken(token);

  const produto = new Produto({
    nomeProduto,
    precoPadrao,
    precoPromocional,
    categoria,
    imagem: [],
  });

  imagem?.map((image) => {
    produto.imagem.push(image.filename);
  });

  try {
    const newProduto = await produto.save();
    res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      newProduto,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllProdutos = async (req, res) => {
  const produtos = await Produto.find().sort("-createdAt");
  res.status(200).json({ produtos });
};

export const getProdutoById = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ message: "ID inválido!" });
  }

  const produto = await Produto.findOne({ _id: id });
  if (!produto) {
    return res.status(404).json({ message: "Produto não encontrado!" });
  }

  res.status(200).json({ produto: produto });
};

export const getProdutoByName = async (req, res) => { //busca pelo nome completo
  try {
    const { nomeProduto } = req.query;

    if (!nomeProduto) {
      return res.status(400).json({ message: "Nome inválido!" });
    }

    const nomeProdutos = nomeProduto.split(",");

    const produtos = await Produto.find({
      nomeProduto: { $in: nomeProdutos },
    });

    res.status(200).json({ produtos });
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const removeProdutoById = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ message: "ID inválido!" });
  }

    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (produto._id.toString() !== id.toString()) {
      return res
        .status(422)
        .json({ message: "Houve um problema em acessar sua solicitação" });
    }

    await Produto.findByIdAndDelete(id);
    res.status(200).json({ message: "Produto removido com sucesso!" });
};

export const updateProduto = async (req, res) => {
  const id = req.params.id;
  const { nomeProduto, precoPadrao, precoPromocional, categoria } = req.body;
  const imagem = req.files;

  const updateData = {};

    const produto = await Produto.findOne({ _id: id });

    if (!produto) {
      res.status(404).json({ message: "Produto não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (produto._id.toString() !== id.toString()) {
      return res
        .status(422)
        .json({ message: "Houve um problema em acessar sua solicitação" });
    }

    if (!nomeProduto) {
      res.status(422).json({ message: "Nome do produto obrigatório!" });
      return;
    } else {
      updateData.nomeProduto = nomeProduto;
    }

    if (!precoPadrao) {
      res.status(422).json({ message: "O preço padrão é obrigatório!" });
      return;
    } else {
      updateData.precoPadrao = precoPadrao;
    }

    if (precoPromocional !== undefined) {
      updateData.precoPromocional = precoPromocional;
    }

    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    } else {
      updateData.categoria = categoria;
    }

    if (!imagem) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    updateData.imagem = [];
    imagem?.map((image) => {
      updateData.imagem.push(image.filename);
    });

    await Produto.findByIdAndUpdate(id, updateData);

    res.status(200).json({ message: "Produto atualizado com sucesso!" });
};
