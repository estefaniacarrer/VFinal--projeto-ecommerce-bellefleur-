import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import getToken from "../util/get-token.js";
import createUserToken from "../util/create-user-token.js";

//registro
export const register = async (req, res) => {
  const { nome, cpf, dataNascimento, email, senha, confirmaSenha } = req.body;

  if (!nome || !dataNascimento || !cpf || !email || !senha || !confirmaSenha) {
    return res.status(422).json({ message: "Campo obrigatório!" });
  }

  if (senha != confirmaSenha) {
    res
      .status(422)
      .json({ message: "A senha e a confirmação precisam ser iguais!" });
    return;
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);

  const user = new User({
    nome,
    cpf,
    dataNascimento,
    email,
    senha: passwordHash,
  });

  try {
    const newUser = await user.save();
    await createUserToken(newUser, req, res);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!senha) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário cadastrado com este e-mail!" });
    }

    if (!user.senha) {
      console.log("Senha do usuário não encontrada");
      return res
        .status(500)
        .json({ message: "Senha do usuário não encontrada!" });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    await createUserToken(user, req, res);
  } catch (error) {
    console.error("Erro ao fazer o login:", error);
    res.status(500).json({ message: "Erro interno ao fazer login" });
  }
};

export const checkUser = async (req, res) => {
  let currentUser;

  if (req.headers.authorization) {
    const token = getToken(req);
    const decoded = jwt.verify(token, "nossosecret");

    currentUser = await User.findById(decoded.id);

    currentUser.senha = undefined;
  } else {
    currentUser = null;
  }

  res.status(200).send(currentUser);
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
};
