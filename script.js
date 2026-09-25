let playlist = [];

const form = document.getElementById("formAdicionar");
const nomeMusica = document.getElementById("nomeMusica");
const nomeArtista = document.getElementById("nomeArtista");

const listaMusicas = document.getElementById("listaMusicas");
const contadorMusicas = document.getElementById("contadorMusicas");
const musicasJuntas = document.getElementById("musicasJuntas");

const artistaFiltro = document.getElementById("artistaFiltro");
const btnFiltrar = document.getElementById("btnFiltrar");
const resultadoFiltro = document.getElementById("resultadoFiltro");

function mostrarPlaylist() {
  listaMusicas.innerHTML = "";

  playlist.forEach((musica, indice) => {
    const item = document.createElement("li");

    item.textContent = musica.nome + " - " + musica.artista;

    const botao = document.createElement("button");
    botao.textContent = "Remover";

    botao.addEventListener("click", () => {
      removerMusica(indice);
    });

    item.appendChild(botao);
    listaMusicas.appendChild(item);
  });

  contadorMusicas.textContent = playlist.length;

  const nomes = playlist.map((musica) => musica.nome);

  musicasJuntas.textContent = nomes.join(", ");
}

function adicionarMusica() {
  const musica = {
    nome: nomeMusica.value,
    artista: nomeArtista.value,
  };

  playlist.push(musica);

  mostrarPlaylist();

  nomeMusica.value = "";
  nomeArtista.value = "";
}

function removerMusica(indice) {
  playlist.splice(indice, 1);

  mostrarPlaylist();
}

function filtrarArtista() {
  const artista = artistaFiltro.value.toLowerCase();

  const filtradas = playlist.filter((musica) => {
    return musica.artista.toLowerCase().includes(artista);
  });

  resultadoFiltro.innerHTML = "";

  filtradas.forEach((musica) => {
    const item = document.createElement("p");

    item.textContent = musica.nome + " - " + musica.artista;

    resultadoFiltro.appendChild(item);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  adicionarMusica();
});

btnFiltrar.addEventListener("click", filtrarArtista);
