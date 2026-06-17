window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('painel-resultado').style.display = 'block';
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Preencha todos os campos!");
    return;
  }

  const chaveUsuario = btoa(`${nome}-${whatsapp}-${dia}-${mes}-${ano}`);
  if (localStorage.getItem(chaveUsuario) === "usado") {
    alert("Dados inválidos ou já utilizados.");
    return;
  }

  let nums = [];
  while(nums.length < 6) { let n = Math.floor(Math.random() * 60) + 1; if(nums.indexOf(n) === -1) nums.push(n); }
  nums.sort((a,b) => a-b);
  const resultado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  const SCRIPT_URL = "window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('painel-resultado').style.display = 'block';
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value;
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !whatsapp || !dia || !mes || !ano) {
    alert("Preencha todos os campos!");
    return;
  }

  const chaveUsuario = btoa(`${nome}-${whatsapp}-${dia}-${mes}-${ano}`);
  if (localStorage.getItem(chaveUsuario) === "usado") {
    alert("Dados inválidos ou já utilizados.");
    return;
  }

  let nums = [];
  while(nums.length < 6) { let n = Math.floor(Math.random() * 60) + 1; if(nums.indexOf(n) === -1) nums.push(n); }
  nums.sort((a,b) => a-b);
  const resultado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  const SCRIPT_URL = "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI";
  
  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  btn.innerText = "Calculando...";

  fetch(SCRIPT_URL, {
    method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, whatsapp, dia, mes, ano, resultado })
  })
  .then(() => {
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = resultado;
    document.getElementById('painel-resultado').style.display = 'block';
    
    localStorage.setItem(chaveUsuario, "usado");
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
    document.getElementById('painel-resultado').scrollIntoView({ behavior: 'smooth' });
  })
  .catch(() => { alert("Erro de conexão."); btn.disabled = false; btn.innerText = "⚡ CALCULAR MINHA SORTE"; });
}

function bloquearInterface() {
  document.getElementById('nome').disabled = true;
  document.getElementById('whatsapp').disabled = true;
  document.getElementById('dia').disabled = true;
  document.getElementById('mes').disabled = true;
  document.getElementById('ano').disabled = true;
  const btn = document.getElementById('btn-gerar');
  if(btn) { btn.disabled = true; btn.innerText = "Limite Atingido"; }
}";
  
  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  btn.innerText = "Calculando...";

  fetch(SCRIPT_URL, {
    method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, whatsapp, dia, mes, ano, resultado })
  })
  .then(() => {
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = resultado;
    document.getElementById('painel-resultado').style.display = 'block';
    
    localStorage.setItem(chaveUsuario, "usado");
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
    document.getElementById('painel-resultado').scrollIntoView({ behavior: 'smooth' });
  })
  .catch(() => { alert("Erro de conexão."); btn.disabled = false; btn.innerText = "⚡ CALCULAR MINHA SORTE"; });
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
