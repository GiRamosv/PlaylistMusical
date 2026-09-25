// ===============================
// Minha Playlist - script.js
// ===============================

const STORAGE_KEY = "minhaPlaylist";

// Elementos do DOM
const formAdicionar = document.getElementById("formAdicionar");
const inputNomeMusica = document.getElementById("nomeMusica");
const inputNomeArtista = document.getElementById("nomeArtista");

const listaMusicas = document.getElementById("listaMusicas");
const contadorMusicas = document.getElementById("contadorMusicas");
const musicasJuntas = document.getElementById("musicasJuntas");

const inputArtistaFiltro = document.getElementById("artistaFiltro");
const btnFiltrar = document.getElementById("btnFiltrar");
const resultadoFiltro = document.getElementById("resultadoFiltro");

// Estado: array de objetos { id, nome, artista }
let playlist = carregarPlaylist();

// ===============================
// Persistência (localStorage)
// ===============================
function carregarPlaylist() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao carregar playlist do localStorage:", erro);
    return [];
  }
}

function salvarPlaylist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
  } catch (erro) {
    console.error("Erro ao salvar playlist no localStorage:", erro);
  }
}

// ===============================
// Renderização
// ===============================
function renderizarPlaylist() {
  // Limpa a lista atual
  listaMusicas.innerHTML = "";

  if (playlist.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhuma música na playlist ainda.";
    li.classList.add("vazio");
    listaMusicas.appendChild(li);
  } else {
    playlist.forEach((musica) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = `${musica.nome} — ${musica.artista}`;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.type = "button";
      btnRemover.classList.add("btn-remover");
      btnRemover.addEventListener("click", () => removerMusica(musica.id));

      li.appendChild(span);
      li.appendChild(btnRemover);
      listaMusicas.appendChild(li);
    });
  }

  // Atualiza contador
  contadorMusicas.textContent = playlist.length;

  // Atualiza texto com músicas separadas por vírgula
  if (playlist.length === 0) {
    musicasJuntas.textContent = "Nenhuma música adicionada.";
  } else {
    const nomes = playlist.map((m) => m.nome);
    musicasJuntas.textContent = nomes.join(", ");
  }
}

// ===============================
// Ações principais
// ===============================
function adicionarMusica(nome, artista) {
  const novaMusica = {
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    nome: nome.trim(),
    artista: artista.trim(),
  };

  playlist.push(novaMusica);
  salvarPlaylist();
  renderizarPlaylist();
}

function removerMusica(id) {
  playlist = playlist.filter((musica) => musica.id !== id);
  salvarPlaylist();
  renderizarPlaylist();
}

function filtrarPorArtista(termoBusca) {
  const termo = termoBusca.trim().toLowerCase();

  if (termo === "") {
    resultadoFiltro.innerHTML = "<p>Digite um artista para buscar.</p>";
    return;
  }

  const encontradas = playlist.filter((musica) =>
    musica.artista.toLowerCase().includes(termo),
  );

  resultadoFiltro.innerHTML = "";

  if (encontradas.length === 0) {
    resultadoFiltro.innerHTML = `<p>Nenhuma música encontrada para "${termoBusca}".</p>`;
    return;
  }

  const ul = document.createElement("ul");
  encontradas.forEach((musica) => {
    const li = document.createElement("li");
    li.textContent = `${musica.nome} — ${musica.artista}`;
    ul.appendChild(li);
  });

  resultadoFiltro.appendChild(ul);
}

// ===============================
// Eventos
// ===============================
formAdicionar.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = inputNomeMusica.value;
  const artista = inputNomeArtista.value;

  if (nome.trim() === "" || artista.trim() === "") {
    return;
  }

  adicionarMusica(nome, artista);

  formAdicionar.reset();
  inputNomeMusica.focus();
});

btnFiltrar.addEventListener("click", () => {
  filtrarPorArtista(inputArtistaFiltro.value);
});

inputArtistaFiltro.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    filtrarPorArtista(inputArtistaFiltro.value);
  }
});

// ===============================
// Inicialização
// ===============================
renderizarPlaylist();
