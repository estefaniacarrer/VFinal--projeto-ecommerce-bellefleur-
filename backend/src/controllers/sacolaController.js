import User from "../models/user.js";
import Produto from "../models/produto.js";
import getToken from "../util/get-token.js";
import getUserByToken from "../util/get-user-by-token.js";
import mongoose from "mongoose";

class SacolaController {
  static async addItemSacola(req, res) {
    const { produtoId, quantidade } = req.body;
    const userId = req.userId;

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const produto = await Produto.findById(produtoId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      if (!produto) {
        return res
          .status(404)
          .json({ message: `Produto com ID ${produtoId} não encontrado!` });
      }

      const produtoNaSacola = user.sacolaItems.find(
        (item) => item.produto.toString() === produtoId
      );

      if (produtoNaSacola) {
        produtoNaSacola.quantidade += quantidade;
      } else {
        user.sacolaItems.push({ produto: produtoId, quantidade });
      }

      await user.save();

      res
        .status(200)
        .json({ message: "Produto adicionado à sacola com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: `Erro interno: ${error.message}` });
    }
  }

  static async getAllUserSacolaItems(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const sacolaItems = await User.findById(user._id)
        .populate("sacola")
        .exec();

      res.status(200).json({ sacolaItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeItemSacola(req, res) {
    const { produtoId } = req.params;

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      user.sacola = user.sacola.filter((item) => item.toString() !== produtoId);

      await user.save();
      res
        .status(200)
        .json({ message: "Produto removido da sacola com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const addItemSacola = SacolaController.addItemSacola;
export const getAllUserSacolaItems = SacolaController.getAllUserSacolaItems;
export const removeItemSacola = SacolaController.removeItemSacola;

export default SacolaController;
