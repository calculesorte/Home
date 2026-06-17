// 8. VERIFICAÇÃO AO RECARREGAR: Se ele atualizar a página, mantém travado se já usou
window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('area-premium').style.display = 'block'; 
  }
};

function gerarCalculoGratis() {
  // 1. Captura os dados de todos os campos
  const nome = document.getElementById('nome').value.trim().toLowerCase();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  // Validação: não deixa avançar com campos vazios
  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Por favor, preencha todos os campos para o cálculo astral.");
    return;
  }

  // 2. Chave anti-fraude baseada nos dados
  const chaveUsuario = btoa(`${nome}-${whatsapp}-${dia}-${mes}-${ano}`);

  // 3. REGRA ANTI-FRAUDE: Verifica se já usou
  if (localStorage.getItem(chaveUsuario) === "usado") {
    alert("Erro: Dados incorretos. Por favor, revise as informações e tente novamente.");
    return;
  }

  // 4. Gera número místico da Mega-Sena (01 a 60)
  const numeroSorteado = String(Math.floor(Math.random() * 60) + 1).padStart(2, '0');

  // 5. Envio para Planilha (Google Sheets) - COLOQUE SUA URL ABAIXO
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec";
   
  const dados = { nome, whatsapp, dia, mes, ano, resultado: numeroSorteado };

  // Bloqueia botão visualmente enquanto envia
  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  btn.innerText = "Calculando...";

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
  .then(() => {
    // 6. Exibe resultados na tela
    document.querySelector('.numero-sorte').innerText = numeroSorteado;
    document.getElementById('resultado-gratis').style.display = 'block';
    document.getElementById('area-premium').style.display = 'block';

    // 7. Marca como usado e bloqueia a interface
    localStorage.setItem(chaveUsuario, "usado");
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
    
    document.getElementById('resultado-gratis').scrollIntoView({ behavior: 'smooth' });
  })
  .catch(err => {
    console.error("Erro:", err);
    alert("Erro ao processar cálculo. Tente novamente.");
    btn.disabled = false;
    btn.innerText = "Gerar Número da Sorte (Grátis)";
  });
}

function bloquearInterface() {
  document.getElementById('nome').disabled = true;
  document.getElementById('whatsapp').disabled = true;
  document.getElementById('dia').disabled = true;
  document.getElementById('mes').disabled = true;
  document.getElementById('ano').disabled = true;
  const btn = document.getElementById('btn-gerar');
  if(btn) {
    btn.disabled = true;
    btn.innerText = "Limite Gratuito Atingido";
  }
}
