import ehUmCPF from "./valida_cpf.js";
import ehMaiorDeIdade from "./valida_idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const botaoSubmit = document.querySelector('.botao-cadastro');
const inputSenha = document.querySelector('#senha');
const inputSenhaRepete = document.querySelector('#confirma-senha');

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagensErroValidacao = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email_cadastro: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caracteres suficientes."
    },
    nascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.',
        tooShort: "Por favor, preencha uma data de nascimento válida."
    },
    senha:{
        valueMissing: "O campo senha não pode estar vazio.",
    },

    confirma_senha:{
        valueMissing: "O campo 'repida senha' não pode estar vazio .",
        tooShort: "Por favor, preencha uma senha válida.",
        customError: "Senhas diferentes."
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};

function verificaCampo(campo) {
    let mensagem = "";
    if (campo.name == "cpf") {
        ehUmCPF(campo);
    }

    if(campo.name == 'confirma_senha' && !verificaSenhaRepetida(campo) && campo.value != ''){
        campo.setCustomValidity('Senhas diferentes.');  
    }else if( campo.name == 'confirma_senha' ){ 
        campo.setCustomValidity(''); 
    }

    if (campo.name == "nascimento" && campo.value !== "") {
        ehMaiorDeIdade(campo);
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagensErroValidacao[campo.name][erro];
        }
    });
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

    let validadorForm = Array.from(camposDoFormulario).find((campo) => campo.checkValidity() == false);
    console.log(validadorForm);
    validadorForm ? botaoSubmit.disabled = true : botaoSubmit.disabled = false;
}

function verificaSenhaRepetida(campo){
    if(inputSenha.value == campo.value){
        return true;
    }else{
        return false;
    }
}

