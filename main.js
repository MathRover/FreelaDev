const servicos = [
  {
    id: 1,
    nome: "Landing Page",
    descricao: "Página única responsiva com design moderno e otimizada para conversão.",
    preco: 1800,
    icone: "🖥️",
  },
  {
    id: 2,
    nome: "Site Institucional",
    descricao: "Site completo com até 5 páginas, formulário de contato e SEO básico.",
    preco: 3500,
    icone: "🏢",
  },
  {
    id: 3,
    nome: "E-commerce",
    descricao: "Loja virtual com catálogo de produtos, carrinho e integração de pagamento.",
    preco: 7500,
    icone: "🛒",
  },
  {
    id: 4,
    nome: "Integração de API",
    descricao: "Conexão com serviços externos (pagamento, e-mail, CRM, etc.).",
    preco: 2200,
    icone: "🔗",
  },
  {
    id: 5,
    nome: "Banco de Dados",
    descricao: "Modelagem, criação e configuração de banco de dados relacional.",
    preco: 1500,
    icone: "🗄️",
  },
  {
    id: 6,
    nome: "Hospedagem e Deploy",
    descricao: "Configuração de servidor, domínio, SSL e deploy da aplicação.",
    preco: 800,
    icone: "☁️",
  },
  {
    id: 7,
    nome: "Manutenção Mensal",
    descricao: "Suporte técnico, atualizações de segurança e pequenas correções.",
    preco: 600,
    icone: "🔧",
  },
  {
    id: 8,
    nome: "Design UI/UX",
    descricao: "Prototipação e design de interfaces focado na experiência do usuário.",
    preco: 2800,
    icone: "🎨",
  },
];

let selecionados = [];

const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const renderizarCards = () => {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = "";

  servicos.forEach((servico) => {
    const ativo = selecionados.includes(servico.id);

    const card = document.createElement("button");
    card.className = "service-card" + (ativo ? " ativo" : "");
    card.setAttribute("data-id", servico.id);
    card.setAttribute("data-preco", servico.preco);

    card.innerHTML =
      '<div class="card-top">' +
      '<span class="card-icon">' +
      servico.icone +
      "</span>" +
      '<div class="card-check">' +
      '<svg fill="none" viewBox="0 0 24 24" stroke="' +
      (ativo ? "hsl(220,20%,7%)" : "transparent") +
      '" stroke-width="3">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      '<div class="card-nome">' +
      servico.nome +
      "</div>" +
      '<p class="card-desc">' +
      servico.descricao +
      "</p>" +
      '<p class="card-preco">' +
      formatarMoeda(servico.preco) +
      "</p>";

    card.onclick = () => {
      const precoDoHTML = card.getAttribute("data-preco");
      const precoConvertido = parseFloat(precoDoHTML);
      console.log("parseFloat() converteu '" + precoDoHTML + "' para:", precoConvertido);

      toggleServico(servico.id);
    };

    grid.appendChild(card);
  });
};

const toggleServico = (id) => {
  if (selecionados.includes(id)) {
    selecionados = selecionados.filter((s) => s !== id);
  } else {
    selecionados.push(id);
  }
  atualizarUI();
};

const atualizarUI = () => {
  renderizarCards();

  let valorTotal = 0;
  selecionados.forEach((id) => {
    const servico = servicos.find((s) => s.id === id);
    if (servico) {
      valorTotal += servico.preco;
    }
  });

  const qtd = selecionados.length;

  document.getElementById("totalCount").textContent =
    qtd + (qtd === 1 ? " serviço selecionado" : " serviços selecionados");

  document.getElementById("totalValor").textContent = formatarMoeda(valorTotal);

  document.getElementById("btnLimpar").style.display = qtd > 0 ? "inline" : "none";

  const btnSolicitar = document.getElementById("btnSolicitar");
  if (qtd > 0) {
    btnSolicitar.className = "btn-solicitar ativo";
    btnSolicitar.disabled = false;
  } else {
    btnSolicitar.className = "btn-solicitar inativo";
    btnSolicitar.disabled = true;
  }
};

function limparTudo() {
  selecionados = [];
  atualizarUI();
}

renderizarCards();