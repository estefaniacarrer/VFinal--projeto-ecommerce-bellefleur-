const url_login = "http://localhost:3000/user/login";

function fazPostLogin(url, dados) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(dados),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Erro no login");
    })
    .then((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("nome", response.nome);
      alert("Login realizado com sucesso!");
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    })
    .catch((err) => {
      alert("Dados incorretos!");
    });
}

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", (event) => fazerLogin(event));

function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email-login").value;
  const senha = document.getElementById("senha-login").value;

  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dados = {
    email: email,
    senha: senha,
  };

  fazPostLogin(url_login, dados);
}