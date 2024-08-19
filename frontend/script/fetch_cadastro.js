const url_register = "http://localhost:3000/user/register";

function fazPost(url, corpo) {
    console.log("Iniciando o fetch com os dados:", corpo);
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(corpo),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
        console.log("Resposta do servidor:", response);
      if (response.ok) {
        return response.json();
      }
      console.error("Erro na resposta do servidor", response.status);
      throw new Error();
    })
    .then((response) => {
      console.log("Dados recebidos do servidor:", response);
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("nome", response.nome);
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    })
    .catch((err) => {
        console.error("Erro ao cadastrar usuário:", err);
      alert("Erro ao cadastrar usuário");
    });
}

const cadastroButton = document.getElementById("enviar");
cadastroButton.addEventListener("click", (event) => cadastrarUsuario(event));

function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const dataNascimento = document.getElementById("nascimento").value;
  const email = document.getElementById("email-cadastro").value;
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirma-senha").value;

  const user = { nome, cpf, dataNascimento, email, senha, confirmaSenha };
  console.log("Dados do usuário:", { nome, cpf, dataNascimento, email, senha, confirmaSenha });

  if (user.senha !== user.confirmaSenha) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }

  fazPost(url_register, user)
}

function validaUsuario(user) {
  if (!user.nome || !user.cpf || !user.dataNascimento || !user.email || !user.senha || !user.confirmaSenha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (user.senha !== user.confirmaSenha) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }
}
