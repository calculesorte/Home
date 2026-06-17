// 8. VERIFICAÇÃO AO RECARREGAR
window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('area-premium').style.display = 'block'; 
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim().toLowerCase();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const chaveUsuario = btoa(`${nome}-${whatsapp}-${dia}-${mes}-${ano}`);
  if (localStorage.getItem(chaveUsuario) === "usado") {
    alert("Erro: Dados incorretos. Tente novamente.");
    return;
  }

  // GERAÇÃO DE 6 NÚMEROS ÚNICOS PARA A MEGA-SENA
  let numeros = [];
  while(numeros.length < 6){
      let n = Math.floor(Math.random() * 60) + 1;
      if(numeros.indexOf(n) === -1) numeros.push(n);
  }
  // Ordena os números do menor para o maior
  numeros.sort((a, b) => a - b);
  const jogoFormatado = numeros.map(n => String(n).padStart(2, '0')).join(' - ');

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec";
  const dados = { nome, whatsapp, dia, mes, ano, resultado: jogoFormatado };

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
    // Exibe os 6 números
    document.querySelector('.numero-sorte').innerText = jogoFormatado;
    document.getElementById('resultado-gratis').style.display = 'block';
    document.getElementById('area-premium').style.display = 'block';

    localStorage.setItem(chaveUsuario, "usado");
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
    document.getElementById('resultado-gratis').scrollIntoView({ behavior: 'smooth' });
  })
  .catch(err => {
    console.error("Erro:", err);
    alert("Erro ao processar.");
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
