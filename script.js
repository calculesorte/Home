window.onload = () => {
  if (localStorage.getItem("usado") === "sim") {
    document.getElementById('painel-resultado').style.display = 'block';
    document.getElementById('btn-gerar').disabled = true;
    document.getElementById('btn-gerar').innerText = "Limite Atingido";
  }
};

function gerarCalculoGratis() {
  const nome = document.getElementById('nome').value;
  const whatsapp = document.getElementById('whatsapp').value;
  if (!nome || !whatsapp) return alert("Preencha os campos!");

  let nums = [];
  while(nums.length < 6) { let n = Math.floor(Math.random() * 60) + 1; if(!nums.includes(n)) nums.push(n); }
  nums.sort((a,b) => a-b);
  const resultado = nums.map(n => String(n).padStart(2, '0')).join(' - ');

  fetch("https://script.google.com/macros/s/AKfycbxnQBMwgs5M3CiuWW5OvkS4bq5bgE2wG2ZvJi20LRJgILp1rZekNSgLc3_ext7oW5Bk/exec", { 
    method: "POST", mode: "no-cors", 
    body: JSON.stringify({ nome, whatsapp, resultado }) 
  }).then(() => {
    document.getElementById('nome-perfil').innerText = nome;
    document.getElementById('resultado-final').innerText = resultado;
    document.getElementById('painel-resultado').style.display = 'block';
    localStorage.setItem("usado", "sim");
    document.getElementById('btn-gerar').disabled = true;
  });
}
