window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    const painel = document.getElementById('painel-resultado');
    if(painel) painel.style.display = 'block';
  }
};

function gerarCalculoGratis() {
  // Captura os valores
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Lógica de sorteio
  let nums = [];
  while(nums.length < 6) { 
    let n = Math.floor(Math.random() * 60) + 1; 
    if(nums.indexOf(n) === -1) nums.push(n); 
  }
  nums.sort((a,b) => a-b);
  const resultado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  // URL da planilha (MANTENHA A SUA AQUI)
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec"; 
  
  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  btn.innerText = "Calculando...";

  fetch(SCRIPT_URL, {
    method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, whatsapp, dia, mes, ano, resultado })
  })
  .then(() => {
    // Exibe o painel de resultado
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = resultado;
    document.getElementById('painel-resultado').style.display = 'block';
    
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
  })
  .catch((err) => { 
    console.error(err);
    alert("Erro de conexão. Tente novamente."); 
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
  if(btn) { btn.disabled = true; btn.innerText = "Limite Atingido"; }
}
