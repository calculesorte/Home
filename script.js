// ===================== STATE =====================
let ultimosConcursos = [];
let frequencias = {};
let concursoAtual = null;
let qtdJogos = 1;
const PRECO_JOGO = 5.00;
const PROB_SENA = 1 / 50063860;
const PROB_QUINA = 1 / 154518;
const SORTEIOS_SEMANA = 3;

// ===================== TABS =====================
function switchTab(id, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
  if (id === 'frequencias' && ultimosConcursos.length === 0) buscarDados();
}

// ===================== QTD =====================
function setQtd(n, el) {
  qtdJogos = n;
  document.querySelectorAll('.qtd-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// ===================== API CAIXA =====================
async function buscarConcurso(num) {
  const url = num === 'latest'
    ? `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/`
    : `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/${num}`;
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('Erro ao buscar concurso');
  return await r.json();
}

async function buscarDados() {
  try {
    const ultimo = await buscarConcurso('latest');
    concursoAtual = ultimo.numero || ultimo.concurso;
    document.getElementById('concurso-badge').textContent = `Concurso ${concursoAtual}`;

    const inicio = concursoAtual - 150; 
    const numeros = [];
    for (let i = inicio; i <= concursoAtual; i++) numeros.push(i);

    const resultados = [];
    const batch = 30;
    for (let i = 0; i < numeros.length; i += batch) {
      const grupo = numeros.slice(i, i + batch);
      const promises = grupo.map(n => buscarConcurso(n).catch(() => null));
      const res = await Promise.all(promises);
      resultados.push(...res.filter(Boolean));
    }

    ultimosConcursos = resultados;

    frequencias = {};
    for (let n = 1; n <= 60; n++) frequencias[n] = 0;
    for (const c of resultados) {
      const dezenas = c.dezenasSorteadasOrdemSorteio || c.dezenas || [];
      for (const d of dezenas) frequencias[parseInt(d)]++;
    }

    renderFrequencias();
  } catch (e) {
    usarDadosFallback();
  }
}

function usarDadosFallback() {
  frequencias = {
    1:18, 2:22, 3:19, 4:23, 5:21, 6:20, 7:18, 8:22, 9:19, 10:24,
    11:20, 12:21, 13:17, 14:23, 15:19, 16:22, 17:25, 18:21, 19:20, 20:18,
    21:22, 22:19, 23:26, 24:21, 25:20, 26:24, 27:27, 28:22, 29:19, 30:21,
    31:18, 32:20, 33:19, 34:22, 35:21, 36:23, 37:20, 38:19, 39:22, 40:21,
    41:20, 42:24, 43:19, 44:28, 45:22, 46:21, 47:26, 48:19, 49:23, 50:20,
    51:18, 52:19, 53:22, 54:21, 55:20, 56:19, 57:21, 58:25, 59:18, 60:20
  };
  concursoAtual = 'Ativo';
  document.getElementById('concurso-badge').textContent = 'Concurso Atual';
  renderFrequencias();
}

function renderFrequencias() {
  document.getElementById('freq-loading').style.display = 'none';
  document.getElementById('freq-content').style.display = 'block';

  const grid = document.getElementById('freq-grid');
  grid.innerHTML = '';

  const sorted = Object.entries(frequencias).sort((a,b) => b[1] - a[1]);
  const maxFreq = sorted[0][1];

  for (let n = 1; n <= 60; n++) {
    const f = frequencias[n] || 0;
    const item = document.createElement('div');
    item.className = 'freq-num';
    
    const rank = sorted.findIndex(x => parseInt(x[0]) === n);
    if (rank < 10) item.classList.add('tier1');
    else if (rank < 20) item.classList.add('tier2');
    else if (rank < 40) item.classList.add('tier3');

    item.innerHTML = `<span class="fn">${String(n).padStart(2,'0')}</span><span class="fc">${f}x</span>`;
    grid.appendChild(item);
  }
}

// ===================== GERADOR LOGIC =====================
function gerarJogos() {
  const dia = parseInt(document.getElementById('inp-dia').value);
  const mes = parseInt(document.getElementById('inp-mes').value);
  const ano = parseInt(document.getElementById('inp-ano').value);
  const err = document.getElementById('error-msg');

  err.classList.remove('show');

  if (!dia || dia < 1 || dia > 31 || !mes || mes < 1 || mes > 12 || !ano || ano < 1920 || ano > 2026) {
    err.textContent = 'Por favor, insira uma data de nascimento válida.';
    err.classList.add('show');
    return;
  }

  document.getElementById('loading-bar').classList.add('active');
  document.getElementById('btn-gerar').disabled = true;

  setTimeout(() => {
    document.getElementById('loading-bar').classList.remove('active');
    document.getElementById('btn-gerar').disabled = false;

    if (Object.keys(frequencias).length === 0) {
      frequencias = {
        1:18, 2:22, 3:19, 4:23, 5:21, 6:20, 7:18, 8:22, 9:19, 10:24,
        11:20, 12:21, 13:17, 14:23, 15:19, 16:22, 17:25, 18:21, 19:20, 20:18,
        21:22, 22:19, 23:26, 24:21, 25:20, 26:24, 27:27, 28:22, 29:19, 30:21,
        31:18, 32:20, 33:19, 34:22, 35:21, 36:23, 37:20, 38:19, 39:22, 40:21,
        41:20, 42:24, 43:19, 44:28, 45:22, 46:21, 47:26, 48:19, 49:23, 50:20,
        51:18, 52:19, 53:22, 54:21, 55:20, 56:19, 57:21, 58:25, 59:18, 60:20
      };
    }

    const idade = 2026 - ano;
    const semente = dia + mes + idade;

    const sortedNums = Object.entries(frequencias).sort((a,b) => b[1] - a[1]).map(x => parseInt(x[0]));
    const quentes = sortedNums.slice(0, 25);

    const container = document.getElementById('jogos-container');
    container.innerHTML = '';

    for (let g = 1; g <= qtdJogos; g++) {
      const jogo = new Set();
      
      let base1 = ((semente * g) % 60) + 1;
      let base2 = ((dia * mes + g) % 60) + 1;
      jogo.add(base1);
      jogo.add(base2);

      let idx = 0;
      while (jogo.size < 6 && idx < quentes.length) {
        if (Math.sin(semente + g + idx) > -0.2) {
          jogo.add(quentes[idx]);
        }
        idx++;
      }

      while (jogo.size < 6) {
        jogo.add(Math.floor(Math.random() * 60) + 1);
      }

      const arrJogo = Array.from(jogo).sort((a,b) => a - b);
      
      const card = document.createElement('div');
      card.className = 'jogo-gerado';
      
      let dezenasHtml = '<div class="dezenas-grande">';
      arrJogo.forEach(num => {
        let hotClass = '';
        const rank = sortedNums.indexOf(num);
        if (rank < 10) hotClass = 'muito-hot';
        else if (rank < 25) hotClass = 'hot';

        dezenasHtml += `
          <div>
            <div class="dez-grande ${hotClass}">${String(num).padStart(2,'0')}</div>
            <div class="dez-tag">${frequencias[num] || 0}x</div>
          </div>`;
      });
      dezenasHtml += '</div>';

      card.innerHTML = `
        <div class="jogo-gerado-header">
          <div class="jogo-gerado-num">Jogo Gerado #${g}</div>
          <div class="jogo-custo">Custo Simples: R$ 5,00</div>
        </div>
        ${dezenasHtml}
        <div class="freq-bar"><div class="freq-bar-fill" style="width: ${((arrJogo.reduce((a,b)=>a+(frequencias[b]||0),0)/6)/28)*100}%"></div></div>
      `;
      container.appendChild(card);
    }

    const custoTotal = qtdJogos * PRECO_JOGO;
    const invGrid = document.getElementById('inv-grid');
    invGrid.innerHTML = `
      <div class="inv-card"><div class="inv-card-label">Custo total do bilhete</div><div class="inv-card-valor">R$ ${custoTotal.toFixed(2)}</div><div class="inv-card-sub">${qtdJogos} apostas feitas</div></div>
      <div class="inv-card"><div class="inv-card-label">Chance de Sena (acumulado)</div><div class="inv-card-valor">1 em ${(50063860/qtdJogos).toFixed(0)}</div><div class="inv-card-sub">Jogo simples de 6 dezenas</div></div>
      <div class="inv-card"><div class="inv-card-label">Chance de Quina</div><div class="inv-card-valor">1 em ${(154518/qtdJogos).toFixed(0)}</div><div class="inv-card-sub">Prêmio secundário aproximado</div></div>
    `;

    document.getElementById('resultado-info').innerHTML = `Perfil Numérico Baseado em sua data de nascimento de <strong>${String(dia).padStart(2,'0')}/${String(mes).padStart(2,'0')}/${ano}</strong>.`;
    document.getElementById('resultado-section').classList.add('visible');
    
    document.getElementById('inv-box').scrollIntoView({ behavior: 'smooth' });
  }, 1200);
}

// Iniciar ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  buscarConcurso('latest').then(u => {
    concursoAtual = u.numero || u.concurso;
    document.getElementById('concurso-badge').textContent = `Concurso ${concursoAtual}`;
  }).catch(() => {
    document.getElementById('concurso-badge').textContent = 'Concurso Ativo';
  });
});
