let jogador = document.getElementById("jogador");
let jogo = document.getElementById("jogo");
let pontosEl = document.getElementById("pontos");
let tempoEl = document.getElementById("tempo");
let mensagemEl = document.getElementById("mensagem");
let x = 280, y = 180, pontos = 0, tempo = 30, jogoAtivo = true;
const config = { velocidade: 20, meta: 100 };
let itens = [];

jogador.style.left = x + "px";
jogador.style.top = y + "px";

const criarItem = () => {
    if (!jogoAtivo) return;
    let item = document.createElement("div");
    item.className = "item";
    let ehEstrela = Math.random() > 0.3;
    item.textContent = ehEstrela ? "⭐" : "💣";
    item.dataset.tipo = ehEstrela ? "estrela" : "bomba";
    item.style.left = Math.random() * 560 + "px";
    item.style.top = Math.random() * 360 + "px";
    jogo.appendChild(item);
    itens.push(item);
    setTimeout(() => {
        item.remove();
        itens = itens.filter(i => i !== item);
    }, 3000);
};

let intervaloItens = setInterval(criarItem, 800);

let cronometro = setInterval(() => {
    if (!jogoAtivo) return;
    tempo--;
    tempoEl.textContent = tempo;
    if (tempo <= 0) fimDeJogo();
}, 1000);

document.addEventListener("keydown", (event) => {
    if (!jogoAtivo) return;
    let tecla = event.key.toLowerCase();
    if (tecla === "arrowup" || tecla === "w") y -= config.velocidade;
    else if (tecla === "arrowdown" || tecla === "s") y += config.velocidade;
    else if (tecla === "arrowleft" || tecla === "a") x -= config.velocidade;
    else if (tecla === "arrowright" || tecla === "d") x += config.velocidade;
    if (x < 0) x = 0; if (x > 560) x = 560; if (y < 0) y = 0; if (y > 360) y = 360;
    jogador.style.left = x + "px";
    jogador.style.top = y + "px";
    verificarColisao();
});

function verificarColisao() {
    for (let index = itens.length - 1; index >= 0; index--) {
        let item = itens[index];
        let itemX = parseInt(item.style.left);
        let itemY = parseInt(item.style.top);
        if (Math.abs(x - itemX) < 35 && Math.abs(y - itemY) < 35) {
            if (item.dataset.tipo === "estrela") { pontos += 10; mensagemEl.textContent = "Boa! +10 pontos! ✨"; }
            else { pontos -= 15; if (pontos < 0) pontos = 0; mensagemEl.textContent = "Ai! Bomba! -15 pontos! 💥"; }
            pontosEl.textContent = pontos;
            item.remove();
            itens.splice(index, 1);
            if (pontos >= config.meta) vitoria();
        }
    }
}

function vitoria() {
    jogoAtivo = false;
    clearInterval(cronometro);
    clearInterval(intervaloItens);
    mensagemEl.textContent = "🎉 VOCÊ VENCEU! Fez 100 pontos!";
    alert("Parabéns! Você venceu!");
}

function fimDeJogo() {
    jogoAtivo = false;
    clearInterval(cronometro);
    clearInterval(intervaloItens);
    mensagemEl.textContent = "⏰ Tempo acabou! Você fez " + pontos + " pontos.";
}

function reiniciar() { location.reload(); }