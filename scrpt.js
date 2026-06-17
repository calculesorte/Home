// URL da sua planilha
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd5dxvPHgziAL12JIGVXzQUl4p6TJyyPPTND4NdMZa_mF0ZsGIcHnkT7bii4DpnEzT/exec";

document.addEventListener('DOMContentLoaded', () => {
    const d = document.getElementById('dia'), m = document.getElementById('mes'), a = document.getElementById('ano');
    for(let i=1; i<=31; i++) d.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=1; i<=12; i++) m.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=2026; i>=1940; i--) a.innerHTML += `<option value="${i}">${i}</option>`;
    
    // Recupera se já houve cálculo
    if (localStorage.getItem('palpiteGerado')) {
        document.getElementById('numeros-sorte').innerHTML = localStorage.getItem('numerosSalvos');
        document.getElementById('resultado').style.display = 'block';
        travarInterface();
    }
});

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    if (!nome) { alert("Preencha seu nome!"); return; }

    let nums = Array.from({length: 6}, () => Math.floor(Math.random() * 60) + 1).sort((a,b) => a - b);
    let resultadoFinal = `<strong>${nums.join(" - ")}</strong>`;
    
    document.getElementById('numeros-sorte').innerHTML = resultadoFinal;
    document.getElementById('resultado').style.display = 'block';

    // Envia para a planilha
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            nome: nome,
            whatsapp: document.getElementById('whatsapp').value,
            dia: document.getElementById('dia').value,
            mes: document.getElementById('mes').value,
            ano: document.getElementById('ano').value,
            resultado: resultadoFinal
        })
    });

    localStorage.setItem('palpiteGerado', 'true');
    localStorage.setItem('numerosSalvos', resultadoFinal);
    travarInterface();
}

function travarInterface() {
    document.querySelectorAll('input, select, .btn-calc').forEach(el => el.disabled = true);
}
