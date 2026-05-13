const livros = [
  "Gênesis",
  "Salmos",
  "Mateus",
  "João",
  "Romanos",
  "Isaías",
  "Provérbios",
  "Filipenses"
];

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const referenceEl = document.getElementById("reference");
const startBtn = document.getElementById("startBtn");

let pontos = 0;
let tempo = 10;
let intervalo;
let jogando = false;

function falar(texto) {

  const msg =
    new SpeechSynthesisUtterance(texto);

  msg.lang = "pt-BR";
  msg.rate = 0.9;

  speechSynthesis.speak(msg);
}

function gerarReferencia() {

  const livro =
    livros[Math.floor(Math.random() * livros.length)];

  const capitulo =
    Math.floor(Math.random() * 50) + 1;

  const versiculo =
    Math.floor(Math.random() * 30) + 1;

  return {
    livro,
    capitulo,
    versiculo
  };
}

function iniciarRodada() {

  startBtn.style.display = "none";

  jogando = false;

  tempo = 10;

  timeEl.textContent = tempo;

  const ref = gerarReferencia();

  // mostra referência
  referenceEl.textContent =
    `${ref.capitulo}:${ref.versiculo}`;

  // limpa falas antigas
  speechSynthesis.cancel();

  // fala introdução
  falar("Espadas desembainhadas!");

  // fala referência
  setTimeout(() => {

    falar(
      `Capítulo ${ref.capitulo} versículo ${ref.versiculo}`
    );

  }, 2500);

  // fala livro
  setTimeout(() => {

    falar(ref.livro);

  }, 7000);

  // começa o tempo
  setTimeout(() => {

    jogando = true;

    clearInterval(intervalo);

    intervalo = setInterval(() => {

      tempo--;

      timeEl.textContent = tempo;

      if (tempo <= 0) {

        clearInterval(intervalo);

        pontos--;

        scoreEl.textContent = pontos;

        jogando = false;

        // mostra botão
        startBtn.textContent =
          "Próximo Versículo";

        startBtn.style.display =
          "inline-block";
      }

    }, 1000);

  }, 9000);
}

document.body.addEventListener("click", () => {

  if (!jogando) return;

  clearInterval(intervalo);

  pontos++;

  scoreEl.textContent = pontos;

  jogando = false;

  startBtn.textContent =
    "Próximo Versículo";

  startBtn.style.display =
    "inline-block";

});

startBtn.addEventListener("click", (e) => {

  e.stopPropagation();

  speechSynthesis.resume();

  iniciarRodada();

});