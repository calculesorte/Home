// Configurações Globais do Motor Mega-Sena
let frequenciasFallback = {
  1:18, 2:22, 3:19, 4:23, 5:21, 6:20, 7:18, 8:22, 9:19, 10:24,
  11:20, 12:21, 13:17, 14:23, 15:19, 16:22, 17:25, 18:21, 19:20, 20:18,
  21:22, 22:19, 23:26, 24:21, 25:20, 26:24, 27:27, 28:22, 29:19, 30:21,
  31:18, 32:20, 33:19, 34:22, 35:21, 36:23, 37:20, 38:19, 39:22, 40:21,
  41:20, 42:24, 43:19, 44:28, 45:22, 46:21, 47:26, 48:19, 49:23, 50:20,
  51:18, 52:19, 53:22, 54:21, 55:20, 56:19, 57:21, 58:25, 59:18, 60:20
};

// Tenta buscar o concurso mais recente da Caixa para atualizar o badge em segundo plano
window.addEventListener('DOMContentLoaded', () => {
  const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/`;
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  
  fetch(proxy)
    .then(r => r.json())
    .then(d => {
      const num = d.numero || d.concurso;
      if(num) document.getElementById('concurso-badge').textContent = `Concurso ${num}`;
    })
    .catch(() => {
      document.getElementById('concurso-badge').textContent = "Mega-Sena";
    });
});

// Função principal de cálculo (Gera as dezenas por trás e mostra a tela com o bloqueio)
function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;
  const err = document.getElementById('error-msg');
  const loader = document.getElementById('loading-bar');
  const btn = document.getElementById('btn-gerar');

  err.classList.remove('show');

  // Validação dos campos originais
  if (!nome) {
    err.textContent = 'Por favor, insira o seu nome.';
    err.classList.add('show');
    return;
  }
  if (!whatsapp) {
    err.textContent = 'Por favor, insira o seu WhatsApp.';
    err.classList.add('show');
    return;
  }
  if (!dia || !mes || !ano) {
    err.textContent = 'Por favor, selecione sua data de nascimento completa.';
    err.classList.add('show');
    return;
  }

  // Ativa a barra de carregamento do cálculo
  loader.classList.add('active');
  btn.disabled = true;

  setTimeout(() => {
    loader.classList.remove('active');
    btn.disabled = false;

    // Motor combinatório baseado na data de nascimento e estatísticas
    const semente = parseInt(dia) + parseInt(mes) + (2026 - parseInt(ano));
    const sortedNums = Object.entries(frequenciasFallback).sort((a,b) => b[1] - a[1]).map(x => parseInt(x[0]));
    const quentes = sortedNums.slice(0, 20);
    
    const jogoSet = new Set();
    
    // Adiciona números baseados na semente gerada pelos dados do usuário
    let n1 = ((semente * 7) % 60) + 1;
    let n2 = ((parseInt(dia) * parseInt(mes)) % 60) + 1;
    jogoSet.add(n1);
    jogoSet.add(n2);

    // Completa o jogo com as dezenas estatisticamente mais fortes da Mega-Sena
    let idx = 0;
    while(jogoSet.size < 6 && idx < quentes.length) {
      jogoSet.add(quentes[idx]);
      idx++;
    }

    // Garante que tenha 6 números de qualquer forma
    while(jogoSet.size < 6) {
      jogoSet.add(Math.floor(Math.random() * 60) + 1);
    }

    const jogoFinal = Array.from(jogoSet).sort((a,b) => a - b);
    
    // Formata as dezenas geradas para colocar no texto escondido atrás do PIX
    const jogoFormatado = jogoFinal.map(n => String(n).padStart(2, '0')).join(' - ');

    // Aplica as informações nas caixas de resultado
    document.getElementById('nome-perfil').textContent = nome;
    document.getElementById('resultado-final').textContent = jogoFormatado;

    // Esconde o painel de entrada e revela o painel verde de resultado com o bloqueio do PIX
    document.getElementById('painel-entrada').style.display = 'none';
    const painelResultado = document.getElementById('painel-resultado');
    painelResultado.style.display = 'block';
    
    // Rola a página suavemente até o resultado
    painelResultado.scrollIntoView({ behavior: 'smooth' });

  }, 1500);
}
