// vendas.js
import { config } from './config.js';

let GLOBAL_PRODUTOS = [];

function enviarDadosParaPlanilha(produto, quantidade) {
    fetch(config.linkGoogleScript, {
        method: 'post',
        body: JSON.stringify({
            link: config.link,
            pagina: config.paginaVendas,
            requisicao: 'enviar',
            informacoes: [produto, quantidade]
        }),
    })
        .then(response => response.json())
        .then(dados => finalizar(dados))
        .catch(error => console.error('Erro:', error));
}

function finalizar(dados) {
    console.log(dados);
}


//Puxar dados da planilha
window.addEventListener('DOMContentLoaded', () => {
    puxarDadosDaPlanilha();
});

const dropdown = document.getElementById('produto')
function puxarDadosDaPlanilha() {
    fetch(config.linkGoogleScript, {
        method: 'post',
        body: JSON.stringify({
            link: config.link,
            pagina: config.paginaEstoque,
            celulas: config.celulasEstoque,
            requisicao: 'requisitar',
        }),
    })
        .then(response => response.json())
        .then(data => GLOBAL_PRODUTOS = data)
        .then(() => preencherDropdown(dropdown))
        .catch(error => console.error('Erro:', error));
}

function preencherDropdown(elemento) {
    elemento.innerHTML = '<option value="">Selecione um produto</option>';

    // console.log(GLOBAL_PRODUTOS);
    // console.log(elemento);

    GLOBAL_PRODUTOS.forEach(item => {
        const option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[0];
        elemento.appendChild(option);
    });
}

document.getElementById('formVenda').addEventListener('submit', function (event) {
    event.preventDefault();
    const produto = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;
    enviarDadosParaPlanilha(produto, quantidade);
    console.log(`Produto: ${produto}, Quantidade: ${quantidade}`);
    alert(`Venda registrada: Produto - ${produto}, Quantidade - ${quantidade}`);
    document.getElementById('formVenda').reset();
});

function adicionarCampoProduto() {
    const divProduto = document.createElement('div');

    var div1 = document.createElement('div');

    var labelProduto = document.createElement('label');
    labelProduto.setAttribute('for', 'produto');
    labelProduto.textContent = 'Produto:';

    var selectProduto = document.createElement('select');
    selectProduto.setAttribute('name', 'produto');
    selectProduto.setAttribute('required', true);

    var optionInicial = document.createElement('option');
    optionInicial.setAttribute('value', '');
    optionInicial.textContent = 'Carregando produtos...';

    selectProduto.appendChild(optionInicial);

    div1.appendChild(labelProduto);
    div1.appendChild(selectProduto);

    var div2 = document.createElement('div');

    var labelValorProduto = document.createElement('label');
    labelValorProduto.setAttribute('for', 'valorProduto');
    labelValorProduto.textContent = 'Valor do Produto:';

    var inputValorProduto = document.createElement('input');
    inputValorProduto.setAttribute('type', 'number');
    inputValorProduto.setAttribute('id', 'valorProduto');
    inputValorProduto.setAttribute('name', 'valorProduto');
    inputValorProduto.setAttribute('required', true);

    div2.appendChild(labelValorProduto);
    div2.appendChild(inputValorProduto);

    divProduto.appendChild(div1);
    divProduto.appendChild(div2);

    document.getElementById('produtosContainer').appendChild(divProduto);
    preencherDropdown(selectProduto);

}

document.getElementById('botaoproduto').addEventListener('click', function (event) {
    adicionarCampoProduto();
})



