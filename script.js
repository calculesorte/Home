window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('painel-resultado').style.display = 'block';
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value;
  if (!nome || !whatsapp || !document.getElementById('dia').value) return alert("Preencha tudo!");

  const btn = document.getElementById('btn-gerar');
  btn.innerText = "Calculando...";
  
  let nums = [];
  while(nums.length < 6) { let n = Math.floor(Math.random() * 60) + 1; if(nums.indexOf(n) === -1) nums.push(n); }
  nums.sort((a,b) => a-b);
  const resultado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  // URL da Planilha (COLE A SUA AQUI)
  fetch("https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec", {
    method: "POST", mode: "no-cors",
    body: JSON.stringify({ nome, whatsapp, resultado })
  }).then(() => {
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = resultado;
    document.getElementById('painel-resultado').style.display = 'block';
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
  });
}

function bloquearInterface() {
  document.getElementById('btn-gerar').disabled = true;
  document.getElementById('btn-gerar').innerText = "Limite Atingido";
}
