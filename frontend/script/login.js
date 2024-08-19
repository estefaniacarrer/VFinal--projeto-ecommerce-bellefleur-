document.addEventListener('DOMContentLoaded', function() {
    const botaoCadastreSe = document.getElementById('botao-cadastre-se');
    const botaoJaSouCliente = document.getElementById('botao-ja-sou-cliente');
    const sectionLoginEntrar = document.getElementById('login-entrar');
    const sectionLoginCadastro = document.getElementById('login-cadastro');

    botaoCadastreSe.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Botão CADASTRE-SE clicado');
        sectionLoginEntrar.classList.add('hide');
        sectionLoginCadastro.classList.remove('hide');
    });

    botaoJaSouCliente.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Botão JÁ SOU CLIENTE clicado');
        sectionLoginCadastro.classList.add('hide');
        sectionLoginEntrar.classList.remove('hide');
    });
});

function toggleVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

document.getElementById('olho').addEventListener('click', function () {
    toggleVisibility('senha');
});

document.getElementById('olho-2').addEventListener('click', function () {
    toggleVisibility('confirma-senha');
});
