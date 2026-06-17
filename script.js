// 8. VERIFICAÇÃO AO RECARREGAR
window.onload = function() {
  if (localStorage.getItem("ultimo_acesso_bloqueado") === "sim") {
    bloquearInterface();
    document.getElementById('area-premium').style.display = 'block'; 
  }
};

function gerarCalculoGratis() {
  // 1. Captura os dados
  const nome = document.getElementById('nome').value.trim().toLowerCase();
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const ano = document.getElementById('ano').value;

  if (!nome || !dia || !mes || !ano) {
    alert("Por favor, preencha todos os campos para o cálculo astral.");
    return;
  }

  // 2. Chave anti-fraude
  const chaveUsuario = btoa(`${nome}-${dia}-${mes}-${ano}`);

  // 3. Verifica se já usou
  if (localStorage.getItem(chaveUsuario) === "usado") {
    alert("Erro: Dados incorretos. Por favor, revise as informações e tente novamente.");
    return;
  }

  // 4. Gera número
  const numeroSorteado = String(Math.floor(Math.random() * 60) + 1).padStart(2, '0');

  // 5. Envio para Planilha (Google Sheets)
  const SCRIPT_URL = "COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI";
  const dados = { nome, dia, mes, ano, resultado: numeroSorteado };

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
  .then(() => {
    // 6. Exibe resultados
    document.querySelector('.numero-sorte').innerText = numeroSorteado;
    document.getElementById('resultado-gratis').style.display = 'block';
    document.getElementById('area-premium').style.display = 'block';

    // 7. Marca como usado e bloqueia
    localStorage.setItem(chaveUsuario, "usado");
    localStorage.setItem("ultimo_acesso_bloqueado", "sim");
    bloquearInterface();
    
    document.getElementById('resultado-gratis').scrollIntoView({ behavior: 'smooth' });
  })
  .catch(err => {
    console.error("Erro:", err);
    alert("Erro ao processar cálculo. Tente novamente.");
  });
}

function bloquearInterface() {
  document.getElementById('nome').disabled = true;
  document.getElementById('dia').disabled = true;
  document.getElementById('mes').disabled = true;
  document.getElementById('ano').disabled = true;
  const btn = document.getElementById('btn-gerar');
  if(btn) {
    btn.disabled = true;
    btn.innerText = "Limite Gratuito Atingido";
  }
}
