// ===== MENU =====
const botaoMenu = document.querySelector('.botao-menu');
const nav = document.querySelector('nav');

botaoMenu.addEventListener('click', function() {
    nav.classList.toggle('menu-aberto');
    botaoMenu.classList.toggle('menu-aberto');
    document.body.classList.toggle('menu-aberto');
});

const linksMenu = document.querySelectorAll('nav a');

linksMenu.forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('menu-aberto');
        botaoMenu.classList.remove('menu-aberto');
        document.body.classList.remove('menu-aberto');
    });
});

// ===== SCROLL =====
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

document.querySelectorAll('nav a[href^="#"], .logo a[href^="#"]').forEach(link => {
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

// ===== CARROSSEL =====
const trilha = document.querySelector('.trilha-carrossel');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const janelaCarrossel = document.querySelector('.imagens-carrossel');

const totalImagens = 6;

let posicaoAtual = 0;
let passo = 0;
let deslocamentoInicial = 0;
let maxPosicao = 0;

function atualizarCarrossel() {
    const deslocamento = deslocamentoInicial - (posicaoAtual * passo);
    trilha.style.transform = `translateX(${deslocamento}px)`;
}

function medirCarrossel() {
    const larguraImagem = trilha.querySelector('img').getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(trilha).columnGap) || 0;
    const larguraJanela = janelaCarrossel.clientWidth;

    passo = larguraImagem + gap;

    const visiveis = Math.max(1, Math.floor(larguraJanela / passo));
    maxPosicao = totalImagens - visiveis;

    // centraliza o grupo de fotos visíveis dentro da janela
    const larguraGrupo = visiveis * larguraImagem + (visiveis - 1) * gap;
    deslocamentoInicial = (larguraJanela - larguraGrupo) / 2;

    if (posicaoAtual > maxPosicao) {
        posicaoAtual = maxPosicao;
    }

    atualizarCarrossel();
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

// arrastar com o dedo (celular)
let inicioToque = 0;

janelaCarrossel.addEventListener('touchstart', function(e) {
    inicioToque = e.touches[0].clientX;
}, { passive: true });

janelaCarrossel.addEventListener('touchend', function(e) {
    const diferenca = inicioToque - e.changedTouches[0].clientX;
    if (Math.abs(diferenca) < 50) return;   // ignora toques curtos

    if (diferenca > 0 && posicaoAtual < maxPosicao) posicaoAtual++;
    if (diferenca < 0 && posicaoAtual > 0) posicaoAtual--;
    atualizarCarrossel();
});

// ===== LOAD E RESIZE (um só de cada) =====
let timeoutRedimensionar;

window.addEventListener('load', function() {
    document.body.classList.add('pronto');
    medirCarrossel();
});

window.addEventListener('resize', function() {
    document.body.classList.add('redimensionando');

    clearTimeout(timeoutRedimensionar);
    timeoutRedimensionar = setTimeout(function() {
        document.body.classList.remove('redimensionando');
        medirCarrossel();
    }, 300);
});