const arrayReceitas = [
	{
		id: 1,
		nome: "Ravioli",
		descricao: "Massa recheada com ricota e espinafre, servida com molho de tomate fresco e manjericão.",
		ingredientes: [
			"Massa de ravioli",
			"Ricota",
			"Espinafre",
		],
		modoDePreparo: [
			"Cozinhe a massa de ravioli conforme as instruções do fabricante.",
			"Prepare a ricota com espinafre picado e tempere com sal e pimenta.",
			"Recheie os ravioli com a mistura de ricota e espinafre.",
			"Cozinhe os ravioli em água fervente até que flutuem.",
			"Sirva com molho de tomate fresco e manjericão."
		],
		dificuldade: "Média",
		tempoDePreparo: "40 minutos",
		imagem: "img/ravioli.jpg",
		cozinha: "Italiana"
	},
	{
		id: 2,
		nome: "Feijoada",
		descricao: "Feijão preto cozido com carnes de porco e linguiça, servido com arroz, couve e laranja.",
		ingredientes: [
			"Feijão preto",
			"Costelinha de porco",
			"Linguiça calabresa",
			"Bacon",
			"Cebola",
			"Alho",
			"Folha de louro"
		],
		modoDePreparo: [
			"Deixe o feijão de molho em água na noite anterior.",
			"Cozinhe o feijão com as folhas de louro na panela de pressão por 30 minutos.",
			"Em outra panela, frite o bacon, a linguiça e a costelinha até dourar.",
			"Junte a cebola e o alho e refogue por mais alguns minutos.",
			"Misture as carnes ao feijão e deixe cozinhar em fogo baixo até o caldo engrossar.",
			"Sirva com arroz branco, couve refogada e laranja."
		],
		dificuldade: "Difícil",
		tempoDePreparo: "90 minutos",
		imagem: "img/feijoada.jpg",
		cozinha: "Brasileira"
	},
	{
		id: 3,
		nome: "Arroz Frito",
		descricao: "Arroz frito na frigideira com ovo, legumes e molho shoyu.",
		ingredientes: [
			"Arroz cozido (de preferência do dia anterior)",
			"Ovos",
			"Cenoura",
			"Ervilha",
			"Cebolinha",
			"Molho shoyu",
			"Óleo de gergelim"
		],
		modoDePreparo: [
			"Pique a cenoura em cubos pequenos e a cebolinha em rodelas.",
			"Mexa os ovos na frigideira bem quente e reserve.",
			"Na mesma frigideira, refogue a cenoura e a ervilha com um fio de óleo de gergelim.",
			"Junte o arroz e frite mexendo sempre, até soltar os grãos.",
			"Acrescente o shoyu e os ovos mexidos e misture bem.",
			"Finalize com a cebolinha e sirva quente."
		],
		dificuldade: "Fácil",
		tempoDePreparo: "20 minutos",
		imagem: "img/arrozFrito.jpg",
		cozinha: "Chinesa"
	}
]

function montarCardsDasReceitas() {
	const container = document.getElementById("listaDeReceitas");
	if (!container) {
		return;
	}

	arrayReceitas.forEach(function (receita) {
		const coluna = document.createElement("div");
		coluna.className = "col-12 col-sm-6 col-md-4";

		const linkDetalhes = `detalhes.html?id=${receita.id}`;

		coluna.innerHTML = `
			<article class="card h-100 cardReceitaRecente">
				<a href="${linkDetalhes}">
					<img src="${receita.imagem}" class="card-img-top" alt="${receita.nome}">
				</a>
				<div class="card-body d-flex flex-column">
					<h3 class="card-title h5">
						<a href="${linkDetalhes}" class="text-reset text-decoration-none">${receita.nome} - ${receita.cozinha}</a>
					</h3>
					<div class="d-flex justify-content-between text-muted small mb-2">
						<span>${receita.tempoDePreparo}</span>
						<span>Dificuldade ${receita.dificuldade.toLowerCase()}</span>
					</div>
					<a href="${linkDetalhes}" class="btn botao-do-cartao mt-auto">
						Acesse <i class="fa-solid fa-chevron-right ms-1"></i>
					</a>
				</div>
			</article>
		`;

		container.appendChild(coluna);
	});
}

function montarDetalhesDaReceita() {
	const container = document.getElementById("conteudoDetalhes");
	if (!container) {
		return;
	}

	const parametros = new URLSearchParams(window.location.search);
	const id = Number(parametros.get("id"));
	const receita = arrayReceitas.find(function (item) {
		return item.id === id;
	});

	if (!receita) {
		container.innerHTML = `
			<div class="cardBusca py-4 px-3 rounded-4 text-center">
				<h1 class="h3">Receita não encontrada</h1>
				<p>Essa receita não existe no caderno.</p>
				<a href="index.html#receitas" class="btn botao-do-cartao">Voltar para as receitas</a>
			</div>
		`;
		return;
	}

	const ingredientes = receita.ingredientes.map(function (ingrediente) {
		return `<li>${ingrediente}</li>`;
	}).join("");

	const passos = receita.modoDePreparo.map(function (passo) {
		return `<li class="mb-2">${passo}</li>`;
	}).join("");

	container.innerHTML = `
		<section class="cardBusca py-4 px-3 px-md-5 rounded-4">
			<div class="row justify-content-center text-center">
				<div class="col-lg-8">
					<img src="${receita.imagem}" alt="${receita.nome}" class="img-fluid rounded mb-3">
					<h1 class="h2">${receita.nome}</h1>
					<p class="text-muted mb-2">
						Cozinha ${receita.cozinha} | ${receita.tempoDePreparo} | Dificuldade ${receita.dificuldade.toLowerCase()}
					</p>
					<p>${receita.descricao}</p>
				</div>
			</div>
		</section>

		<div class="row g-4 mt-1">
			<section class="col-12 col-md-5">
				<div class="card h-100 cardReceitaRecente p-3">
					<h2 class="h4">Ingredientes</h2>
					<ul class="mb-0">${ingredientes}</ul>
				</div>
			</section>
			<section class="col-12 col-md-7">
				<div class="card h-100 cardReceitaRecente p-3">
					<h2 class="h4">Modo de preparo</h2>
					<ol class="mb-0">${passos}</ol>
				</div>
			</section>
		</div>

		<a href="index.html#receitas" class="btn botao-do-cartao mt-4">
			<i class="fa-solid fa-chevron-left me-1"></i> Voltar para as receitas
		</a>
	`;
}

montarCardsDasReceitas();
montarDetalhesDaReceita();