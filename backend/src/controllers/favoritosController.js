import User from "../models/user.js";
import Produto from "../models/produto.js";
import getToken from "../util/get-token.js";
import getUserByToken from "../util/get-user-by-token.js";

class FavoritosController {
  static async addItemFavoritos(req, res) {
    const { produtoId } = req.body;

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const produto = await Produto.findById(produtoId);

      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado!" });
        return;
      }

      if (!user.favoritos.includes(produtoId)) {
        user.favoritos.push(produtoId);
        await user.save();
      }

      res.status(200).json({ message: "Produto adicionado aos favoritos com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUserFavoritos(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      const favoritos = await User.findById(user._id)
        .populate("favoritos")
        .exec();

      res.status(200).json({ favoritos });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeItemFavoritos(req, res) {
    const { produtoId } = req.params;

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      user.favoritos = user.favoritos.filter(
        (item) => item.toString() !== produtoId
      );

      await user.save();
      res.status(200).json({ message: "Produto removido dos favoritos com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const addItemFavoritos = FavoritosController.addItemFavoritos;
export const getAllUserFavoritos = FavoritosController.getAllUserFavoritos;
export const removeItemFavoritos = FavoritosController.removeItemFavoritos;

export default FavoritosController;
