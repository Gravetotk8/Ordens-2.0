import { config } from './config.js';

function enviarDadosParaPlanilha(produto, quantidade, valor) {
    fetch(config.linkGoogleScript, {
        method: 'post',
        body: JSON.stringify({
            link: config.link,
            pagina: config.paginaEstoque,
            requisicao: 'enviar',
            informacoes: [produto, quantidade, valor]
        }),
    })
    .then((response) => response.json())
    .then((dados) => finalizar(dados))
    .catch((error) => console.error('Erro:', error));
}

function finalizar(dados){
    console.log(dados);
}

document.getElementById('formEstoque').addEventListener('submit', function(event) {
    event.preventDefault();
    const produto = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;
    enviarDadosParaPlanilha(produto, quantidade, valor);
    document.getElementById('formEstoque').reset();
});
