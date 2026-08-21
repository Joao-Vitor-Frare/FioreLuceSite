const botaoMenu = document.querySelector('.botao-menu');
const nav = document.querySelector('nav');

botaoMenu.addEventListener('click', function() {
    nav.classList.toggle('menu-aberto');
    botaoMenu.classList.toggle('menu-aberto');
    document.body.classList.toggle('menu-aberto');
});

window.addEventListener('load', function() {
    document.body.classList.add('pronto');
});

let timeoutRedimensionar;

window.addEventListener('resize', function() {
    document.body.classList.add('redimensionando');

    clearTimeout(timeoutRedimensionar);
    timeoutRedimensionar = setTimeout(function() {
        document.body.classList.remove('redimensionando');
    }, 300);
});

let ultimaPosicao = 0;

window.addEventListener('scroll', function() {
    const posicaoAtual = window.scrollY;

    if (posicaoAtual > 50) {
        document.body.classList.add('rolou');
    } else {
        document.body.classList.remove('rolou');
    }

    if (posicaoAtual > ultimaPosicao && posicaoAtual > 100) {
        document.body.classList.add('escondida');
    } else {
        document.body.classList.remove('escondida');
    }

    ultimaPosicao = posicaoAtual;
});