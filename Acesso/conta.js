// vendas.js

import { config } from '../config.js';

function enviarDadosParaPlanilha(email, senhaCriptografada, tipo) {
    fetch(config.linkGoogleScript2, {
        method: 'post',
        body: JSON.stringify({
            link: config.link,
            pagina: 'Users',
            requisicao: tipo,
            informacoes: [email, senhaCriptografada]
        }),
    })
    .then(response => response.json())
    .then(dados => finalizar(dados, tipo))
    .catch(error => console.error('Erro:', error));
}

function finalizar(dados, tipo) {
    console.log(dados);
    let messageElement;
    if (tipo === 'criar') {
        messageElement = document.getElementById('signupMessage');
    } else if (tipo === 'trocar') {
        messageElement = document.getElementById('changePasswordMessage');
    } else {
        messageElement = document.getElementById('loginMessage');
    }
    if (messageElement) {
        messageElement.innerHTML = dados.mensagem;
    }
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    enviarDadosParaPlanilha(email, encryptedPassword, 'criar');
});

document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('changeEmail').value;
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const encryptedNewPassword = CryptoJS.SHA256(newPassword).toString();

    enviarDadosParaPlanilha(email, encryptedNewPassword, 'trocar');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    fetch(config.linkGoogleScript2, {
        method: 'post',
        body: JSON.stringify({
            link: config.link,
            pagina: 'Users',
            requisicao: 'login',
            informacoes: [email, encryptedPassword]
        }),
    })
    .then(response => response.json())
    .then(dados => finalizar(dados, 'login'))
    .catch(error => console.error('Erro:', error));
});

document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    google.script.run.showSignupForm();
});

document.getElementById('changePasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    google.script.run.showChangePasswordForm();
});
