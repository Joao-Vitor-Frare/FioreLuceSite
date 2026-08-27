const botaoMenu = document.querySelector('.botao-menu');
const nav = document.querySelector('nav');

botaoMenu.addEventListener('click', function() {
    nav.classList.toggle('menu-aberto');
    botaoMenu.classList.toggle('menu-aberto');
    document.body.classList.toggle('menu-aberto');s
});

const linksMenu = document.querySelectorAll('nav a');

linksMenu.forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('menu-aberto');
        botaoMenu.classList.remove('menu-aberto');
        document.body.classList.remove('menu-aberto');
    });
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

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute('href'));

        if (this.getAttribute('href') === '#inicio') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            destino.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

const trilha = document.querySelector('.trilha-carrossel');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

const larguraImagem = 487.5;
const gap = 20;
const passo = larguraImagem + gap;
const deslocamentoInicial = 150;
const totalImagens = 6;
const imagensVisiveis = 3;
const maxPosicao = totalImagens - imagensVisiveis;

let posicaoAtual = 0;

function atualizarCarrossel() {
    const deslocamento = deslocamentoInicial - (posicaoAtual * passo);
    trilha.style.transform = `translateX(${deslocamento}px)`;
}

setaDireita.addEventListener('click', function() {
    if (posicaoAtual < maxPosicao) {
        posicaoAtual++;
        atualizarCarrossel();
    }
});

setaEsquerda.addEventListener('click', function() {
    if (posicaoAtual > 0) {
        posicaoAtual--;
        atualizarCarrossel();
    }
});