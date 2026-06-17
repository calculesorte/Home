window.onload = function() {
  // Se o usuário já usou, mostra o painel de resultado direto
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    const resultado = document.getElementById('painel-resultado');
    if(resultado) resultado.style.display = 'block';
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  btn.innerText = "Calculando sua Sorte...";
  
  // Geração de 6 números únicos
  let nums = [];
  while(nums.length < 6) { 
    let n = Math.floor(Math.random() * 60) + 1; 
    if(nums.indexOf(n) === -1) nums.push(n); 
  }
  nums.sort((a,b) => a-b);
  const jogoFormatado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  // URL DA SUA PLANILHA (Google Apps Script)
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec";

  fetch(SCRIPT_URL, {
    method: "POST", 
    mode: "no-cors",
    body: JSON.stringify({ nome, whatsapp, dia, mes, ano, resultado: jogoFormatado })
  })
  .then(() => {
    // Exibe o painel de resultado com os dados
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = jogoFormatado;
    
    const painelRes = document.getElementById('painel-resultado');
    painelRes.style.display = 'block';
    
    // Trava para não usar de novo
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();

    // Rola para o resultado
    painelRes.scrollIntoView({ behavior: 'smooth' });
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao calcular. Tente novamente.");
    btn.disabled = false;
    btn.innerText = "⚡ CALCULAR MINHA SORTE";
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
