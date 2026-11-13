const titulo = document.getElementById("titulo-principal");
const btnTema = document.querySelector("#btn-tema");
const lista = document.querySelector("#lista-cursos");
const formulario = document.querySelector("#form-cadastro");
const mensagem = document.querySelector("#mensagem");
const campoBusca = document.querySelector("#campo-busca");
const filtroArea = document.querySelector("#filtro-area");

// Desafio 1
titulo.textContent = "Cursos do IFPB Cajazeiras";

// Desafio 4
btnTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-alternativo");
});

// Mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.classList.remove("mensagem--sucesso", "mensagem--erro");
    if (tipo) {
        mensagem.classList.add("mensagem--" + tipo);
    }
}

// Desafio 8: delegação
lista.addEventListener("click", (event) => {
    const botao = event.target.closest("button");
    if (!botao || !lista.contains(botao)) {
        return;
    }

    const card = botao.closest(".card-curso");

    if (botao.dataset.acao === "detalhes") {
        card.querySelector(".detalhes").classList.toggle("oculto");
    }
    if (botao.dataset.acao === "remover") {
        card.remove();
    }
});

// Desafio 9: filtros
function aplicarFiltros() {
    const termo = campoBusca.value.trim().toLowerCase();
    const area = filtroArea.value;
    const cards = document.querySelectorAll(".card-curso");
    let visiveis = 0;

    cards.forEach((card) => {
        const nome = card.querySelector("h2").textContent.toLowerCase();
        const combinaNome = nome.includes(termo);
        const combinaArea = area === "todos" || card.dataset.area === area;
        const mostrar = combinaNome && combinaArea;

        card.classList.toggle("oculto", !mostrar);
        if (mostrar) {
            visiveis++;
        }
    });

    mostrarMensagem(`${visiveis} curso(s) encontrado(s).`);
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroArea.addEventListener("change", aplicarFiltros);

// Desafio 10: cadastro
function criarBotao(texto, acao, variante) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.classList.add("botao", variante);
    botao.dataset.acao = acao;
    botao.textContent = texto;
    return botao;
}

function criarCard(nome, area) {
    const card = document.createElement("article");
    card.className = "card-curso";
    card.dataset.area = area;

    const tituloCard = document.createElement("h2");
    tituloCard.textContent = nome;

    const descricao = document.createElement("p");
    descricao.className = "descricao";
    descricao.textContent = "Curso cadastrado pelo formulário.";

    const detalhes = document.createElement("p");
    detalhes.className = "detalhes oculto";
    detalhes.textContent = "Detalhes ainda não informados.";

    card.append(
        tituloCard,
        descricao,
        criarBotao("Ver detalhes", "detalhes", "botao--principal"),
        detalhes,
        criarBotao("Remover", "remover", "botao--perigo")
    );

    return card;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const campoNome = document.querySelector("#nome-curso");
    const nome = campoNome.value.trim();
    const area = document.querySelector("#area-curso").value;

    if (nome === "") {
        mostrarMensagem("Informe o nome do curso.", "erro");
        return;
    }

    lista.append(criarCard(nome, area));
    campoNome.value = "";
    mostrarMensagem(`Curso "${nome}" cadastrado!`, "sucesso");
});